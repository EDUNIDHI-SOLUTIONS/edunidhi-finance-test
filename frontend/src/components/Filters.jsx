const Filters = ({ filters, onChange }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-wrap gap-4">
    <div className="w-full md:w-48">
      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Class</label>
      <select
        value={filters.class || ''}
        onChange={(event) => onChange({ ...filters, class: event.target.value })}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
      >
        <option value="">All</option>
        {['Nursery', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'].map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>
    </div>
    <div className="w-full md:w-48">
      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Section</label>
      <select
        value={filters.section || ''}
        onChange={(event) => onChange({ ...filters, section: event.target.value })}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
      >
        <option value="">All</option>
        {['A', 'B', 'C', 'D'].map((section) => (
          <option key={section} value={section}>
            {section}
          </option>
        ))}
      </select>
    </div>
    <div className="flex-1 min-w-[200px]">
      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Search</label>
      <input
        type="search"
        value={filters.query || ''}
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        placeholder="Search by name or admission number"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
      />
    </div>
  </div>
);

export default Filters;
