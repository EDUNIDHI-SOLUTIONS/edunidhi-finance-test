import { useEffect, useState } from 'react';
import { useOutstandingByClass } from '../services/api.js';

const Reports = () => {
  const { data: outstanding } = useOutstandingByClass();
  const [filters, setFilters] = useState({ range: 'this-month' });

  useEffect(() => {
    setFilters((prev) => ({ ...prev }));
  }, []);

  const rows = outstanding?.length
    ? outstanding
    : [
        { _id: 'XII', pending: 3.6, total: 12.4 },
        { _id: 'XI', pending: 3.1, total: 10.9 },
        { _id: 'X', pending: 2.4, total: 9.7 }
      ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">Outstanding by Class</h3>
            <p className="text-xs text-slate-400 mt-1">Identify classes with the highest receivables</p>
          </div>
          <select
            value={filters.range}
            onChange={(event) => setFilters({ range: event.target.value })}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
          >
            <option value="this-month">This Month</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="financial-year">Financial Year</option>
          </select>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Pending (₹ Lakh)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total (₹ Lakh)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row._id}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-700">Class {row._id}</td>
                  <td className="px-4 py-3 text-sm text-red-500 font-semibold">{row.pending.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{row.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
