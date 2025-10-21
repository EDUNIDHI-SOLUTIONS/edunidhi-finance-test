import { useEffect, useState } from 'react';
import { usePermissions, useUpdatePermission } from '../services/api.js';

const modules = ['dashboard', 'dues', 'payments', 'reports', 'settings'];
const roles = ['Accountant', 'Finance Admin', 'Principal'];

const PermissionPanel = () => {
  const { data: existingPermissions } = usePermissions();
  const updatePermission = useUpdatePermission();
  const [matrix, setMatrix] = useState({});

  useEffect(() => {
    if (existingPermissions) {
      const next = {};
      existingPermissions.forEach((permission) => {
        next[`${permission.role}-${permission.module}`] = permission;
      });
      setMatrix(next);
    }
  }, [existingPermissions]);

  const toggle = (role, module, field) => {
    const key = `${role}-${module}`;
    const existing = matrix[key] || { role, module, canView: false, canEdit: false, canApprove: false };
    const updated = { ...existing, [field]: !existing[field] };
    setMatrix((prev) => ({ ...prev, [key]: updated }));
    updatePermission.mutate(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700">Permission Matrix</h3>
        <p className="text-xs text-slate-400 mt-1">Control access for finance roles across modules</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Role / Module
              </th>
              {modules.map((module) => (
                <th key={module} className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">
                  {module}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {roles.map((role) => (
              <tr key={role}>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{role}</td>
                {modules.map((module) => {
                  const key = `${role}-${module}`;
                  const permission = matrix[key] || {};
                  return (
                    <td key={module} className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <label className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300"
                            checked={Boolean(permission.canView)}
                            onChange={() => toggle(role, module, 'canView')}
                          />
                          View
                        </label>
                        <label className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300"
                            checked={Boolean(permission.canEdit)}
                            onChange={() => toggle(role, module, 'canEdit')}
                          />
                          Edit
                        </label>
                        <label className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300"
                            checked={Boolean(permission.canApprove)}
                            onChange={() => toggle(role, module, 'canApprove')}
                          />
                          Approve
                        </label>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionPanel;
