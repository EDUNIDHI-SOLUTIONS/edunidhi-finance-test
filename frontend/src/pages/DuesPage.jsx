import { useMemo, useState } from 'react';
import Filters from '../components/Filters.jsx';
import FeeTable from '../components/FeeTable.jsx';
import { useStudents } from '../services/api.js';

const DuesPage = () => {
  const [filters, setFilters] = useState({ class: '', section: '', query: '' });
  const { data: students } = useStudents(filters);

  const rows = useMemo(() => {
    if (students?.length) {
      return students.map((student) => ({
        id: student._id,
        name: student.name,
        admissionNumber: student.admissionNumber,
        class: `${student.class}${student.section ? ` - ${student.section}` : ''}`,
        totalDue: student.dues?.total || 0,
        pending: student.dues?.pending || 0
      }));
    }

    return [
      { id: '1', name: 'Aarav Sharma', admissionNumber: 'EDU001', class: 'X - A', totalDue: 68000, pending: 12000 },
      { id: '2', name: 'Meera Kapoor', admissionNumber: 'EDU002', class: 'X - A', totalDue: 65000, pending: 15000 },
      { id: '3', name: 'Lakshya Singh', admissionNumber: 'EDU003', class: 'IX - B', totalDue: 54000, pending: 18000 }
    ];
  }, [students]);

  return (
    <div className="space-y-6">
      <Filters filters={filters} onChange={setFilters} />
      <FeeTable rows={rows} onSelect={(row) => console.log('Selected', row)} />
    </div>
  );
};

export default DuesPage;
