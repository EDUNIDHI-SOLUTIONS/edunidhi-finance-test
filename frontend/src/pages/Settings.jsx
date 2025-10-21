import { useState } from 'react';

const Settings = () => {
  const [form, setForm] = useState({
    academicYear: '2024-25',
    dueReminderDays: 5,
    autoReconcile: true,
    notifyGuardians: true
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-700">Finance Automation</h3>
        <p className="text-xs text-slate-400 mt-1">Tune how reminders and reconciliations operate</p>
        <form className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1 text-sm text-slate-600">
              <span className="block text-xs font-semibold text-slate-500 uppercase">Academic Year</span>
              <input
                value={form.academicYear}
                onChange={(event) => setForm((prev) => ({ ...prev, academicYear: event.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:ring-primary"
              />
            </label>
            <label className="space-y-1 text-sm text-slate-600">
              <span className="block text-xs font-semibold text-slate-500 uppercase">Reminder Lead Time (days)</span>
              <input
                type="number"
                min="0"
                value={form.dueReminderDays}
                onChange={(event) => setForm((prev) => ({ ...prev, dueReminderDays: Number(event.target.value) }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:ring-primary"
              />
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.autoReconcile}
                onChange={(event) => setForm((prev) => ({ ...prev, autoReconcile: event.target.checked }))}
                className="rounded border-slate-300"
              />
              Enable automatic Razorpay reconciliation
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.notifyGuardians}
                onChange={(event) => setForm((prev) => ({ ...prev, notifyGuardians: event.target.checked }))}
                className="rounded border-slate-300"
              />
              Send SMS + email reminders to guardians
            </label>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
