import { useMemo, useState } from 'react';
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  Cog6ToothIcon,
  CreditCardIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import Dashboard from './components/Dashboard.jsx';
import PermissionPanel from './components/PermissionPanel.jsx';
import Reports from './components/Reports.jsx';
import Login from './pages/Login.jsx';
import DuesPage from './pages/DuesPage.jsx';
import PaymentsPage from './pages/PaymentsPage.jsx';
import Settings from './pages/Settings.jsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
  { name: 'Dues', path: '/dues', icon: Bars3Icon },
  { name: 'Payments', path: '/payments', icon: CreditCardIcon },
  { name: 'Permissions', path: '/permissions', icon: Cog6ToothIcon },
  { name: 'Reports', path: '/reports', icon: ChartBarIcon },
  { name: 'Settings', path: '/settings', icon: AdjustmentsHorizontalIcon }
];

const AppShell = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const active = navItems.find((item) => location.pathname.startsWith(item.path));
    return active?.name || 'Finance';
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-72' : 'w-16'
        } hidden md:flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200">
          <h1 className={`text-xl font-semibold text-primary ${isSidebarOpen ? 'block' : 'hidden'}`}>
            Edunidhi Finance
          </h1>
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="text-slate-500 hover:text-primary"
            aria-label="Toggle navigation"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className={isSidebarOpen ? 'block' : 'hidden'}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200">
          <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary" type="button">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span className={isSidebarOpen ? 'block' : 'hidden'}>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1">
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase text-slate-400">Finance Control Center</p>
            <h2 className="text-2xl font-semibold text-slate-700">{pageTitle}</h2>
          </div>
        </header>
        <section className="p-6 space-y-6">{children}</section>
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/*"
      element={
        <ProtectedRoute>
          <AppShell>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dues" element={<DuesPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="permissions" element={<PermissionPanel />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppShell>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default App;
