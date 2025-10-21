import { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useFinanceSummary } from '../services/api.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatCard = ({ title, value, subtitle, accentClass }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
    <p className="text-sm text-slate-500">{title}</p>
    <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
    {subtitle && <p className={`mt-1 text-xs uppercase tracking-wide ${accentClass}`}>{subtitle}</p>}
  </div>
);

const Dashboard = () => {
  const { data, loading } = useFinanceSummary();
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    setTimelineData([
      { month: 'Jan', amount: 8.6 },
      { month: 'Feb', amount: 6.1 },
      { month: 'Mar', amount: 7.4 },
      { month: 'Apr', amount: 9.8 },
      { month: 'May', amount: 12.2 },
      { month: 'Jun', amount: 10.3 }
    ]);
  }, []);

  const duesBreakdown = useMemo(() => {
    const total = data?.dues?.total || 1;
    const pending = data?.dues?.pending || 0;
    return {
      labels: ['Collected', 'Pending'],
      datasets: [
        {
          label: 'Dues',
          data: [Math.max(total - pending, 0), pending],
          backgroundColor: ['#1f6feb', '#f59e0b']
        }
      ]
    };
  }, [data]);

  const collectionSeries = useMemo(
    () => ({
      labels: timelineData.map((item) => item.month),
      datasets: [
        {
          label: 'Collection (₹ Lakh)',
          data: timelineData.map((item) => item.amount),
          backgroundColor: '#1f6feb'
        }
      ]
    }),
    [timelineData]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Students"
          value={loading ? '…' : data?.students || 0}
          subtitle="Active"
          accentClass="text-primary"
        />
        <StatCard
          title="Total Dues"
          value={loading ? '…' : `₹ ${(data?.dues?.total || 0).toLocaleString()}`}
          subtitle="Aggregate"
          accentClass="text-accent"
        />
        <StatCard
          title="Pending Dues"
          value={loading ? '…' : `₹ ${(data?.dues?.pending || 0).toLocaleString()}`}
          subtitle="Receivables"
          accentClass="text-red-500"
        />
        <StatCard
          title="Concessions"
          value={loading ? '…' : `₹ ${(data?.concessions || 0).toLocaleString()}`}
          subtitle="Approved"
          accentClass="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-700">Collection Status</h3>
          <p className="text-xs text-slate-400 mt-1">Live snapshot of fees collected vs pending</p>
          <div className="mt-6 flex justify-center">
            <div className="w-60 h-60">
              <Doughnut data={duesBreakdown} options={{ plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-700">Collections Timeline</h3>
          <p className="text-xs text-slate-400 mt-1">Monthly fee collections (₹ Lakh)</p>
          <div className="mt-4">
            <Bar
              data={collectionSeries}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { ticks: { callback: (value) => `${value}` } } }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
