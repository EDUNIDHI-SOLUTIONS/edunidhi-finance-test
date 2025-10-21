import Student from '../models/Student.js';
import Concession from '../models/Concession.js';
import Permission from '../models/Permission.js';
import FeeOrder from '../models/FeeOrder.js';

export const getStudents = async (req, res, next) => {
  try {
    const { class: className, section, q } = req.query;
    const filter = {};

    if (className) filter.class = className;
    if (section) filter.section = section;
    if (q) filter.name = { $regex: q, $options: 'i' };

    const students = await Student.find(filter)
      .populate('concessions')
      .populate('permissions')
      .sort({ name: 1 });

    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudentOrders = async (req, res, next) => {
  try {
    const orders = await FeeOrder.find({ student: req.params.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createConcession = async (req, res, next) => {
  try {
    const concession = await Concession.create(req.body);
    await Student.findByIdAndUpdate(concession.student, {
      $push: { concessions: concession._id }
    });
    res.status(201).json(concession);
  } catch (error) {
    next(error);
  }
};

export const listPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (req, res, next) => {
  try {
    const { role, module } = req.body;
    const permission = await Permission.findOneAndUpdate({ role, module }, req.body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });

    res.json(permission);
  } catch (error) {
    next(error);
  }
};

export default {
  getStudents,
  createStudent,
  updateStudent,
  getStudentOrders,
  createConcession,
  listPermissions,
  updatePermission
};
