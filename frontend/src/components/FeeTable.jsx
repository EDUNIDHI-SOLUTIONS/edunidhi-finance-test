const FeeTable = ({ rows, onSelect }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Student
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Class
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Due
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pending
          </th>
          <th className="px-4 py-3" />
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-3 text-sm text-slate-700">
              <div className="font-medium text-slate-800">{row.name}</div>
              <div className="text-xs text-slate-400">Adm. No: {row.admissionNumber}</div>
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">{row.class}</td>
            <td className="px-4 py-3 text-sm text-slate-600">₹ {row.totalDue.toLocaleString()}</td>
            <td className="px-4 py-3 text-sm text-red-500 font-semibold">₹ {row.pending.toLocaleString()}</td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => onSelect?.(row)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
              >
                Collect Fee
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FeeTable;
