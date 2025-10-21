import Student from '../models/Student.js';
import Transaction from '../models/Transaction.js';
import Concession from '../models/Concession.js';

export const getSummary = async (req, res, next) => {
  try {
    const [studentCount, totalDuesAgg, totalCollectedAgg, concessionsAgg] = await Promise.all([
      Student.countDocuments(),
      Student.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$dues.total' },
            pending: { $sum: '$dues.pending' }
          }
        }
      ]),
      Transaction.aggregate([
        {
          $group: {
            _id: null,
            collected: { $sum: '$amount' }
          }
        }
      ]),
      Concession.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ])
    ]);

    const totals = totalDuesAgg[0] || { total: 0, pending: 0 };
    const collected = totalCollectedAgg[0]?.collected || 0;
    const concessions = concessionsAgg[0]?.total || 0;

    res.json({
      students: studentCount,
      dues: totals,
      collected,
      concessions
    });
  } catch (error) {
    next(error);
  }
};

export const getCollectionTimeline = async (req, res, next) => {
  try {
    const timeline = await Transaction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          amount: { $sum: '$amount' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1
        }
      }
    ]);

    res.json(timeline);
  } catch (error) {
    next(error);
  }
};

export const getOutstandingByClass = async (req, res, next) => {
  try {
    const outstanding = await Student.aggregate([
      {
        $group: {
          _id: '$class',
          pending: { $sum: '$dues.pending' },
          total: { $sum: '$dues.total' }
        }
      },
      { $sort: { pending: -1 } }
    ]);

    res.json(outstanding);
  } catch (error) {
    next(error);
  }
};

export default {
  getSummary,
  getCollectionTimeline,
  getOutstandingByClass
};
