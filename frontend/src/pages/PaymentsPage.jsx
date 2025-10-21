import { useState } from 'react';
import { initRazorpayCheckout } from '../services/razorpayClient.js';

const dummyTransactions = [
  {
    id: 'txn_1',
    student: 'Aarav Sharma',
    amount: 12000,
    method: 'UPI',
    status: 'captured',
    date: '2024-01-06T10:00:00Z'
  },
  {
    id: 'txn_2',
    student: 'Meera Kapoor',
    amount: 15000,
    method: 'Card',
    status: 'captured',
    date: '2024-01-04T14:20:00Z'
  }
];

const PaymentsPage = () => {
  const [isLoading, setLoading] = useState(false);

  const handleCollectPayment = async () => {
    try {
      setLoading(true);
      await initRazorpayCheckout({
        orderId: 'order_DUMMY',
        amount: 15000,
        student: { name: 'Sample Student', contact: '9999999999', email: 'student@example.com' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-700">Collect Payment</h3>
          <p className="text-xs text-slate-400 mt-1">Trigger a Razorpay payment in sandbox mode</p>
        </div>
        <button
          type="button"
          onClick={handleCollectPayment}
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-60"
        >
          {isLoading ? 'Initializing…' : 'Launch Checkout'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {dummyTransactions.map((txn) => (
              <tr key={txn.id}>
                <td className="px-4 py-3 text-sm font-mono text-slate-500">{txn.id}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{txn.student}</td>
                <td className="px-4 py-3 text-sm text-slate-700">₹ {txn.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{txn.method}</td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {new Date(txn.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;
