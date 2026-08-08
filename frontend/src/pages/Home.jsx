import { useState, useEffect, useCallback } from 'react';
import { Building2, RefreshCw, Users, Briefcase, Code2, LayoutGrid } from 'lucide-react';
import toast from 'react-hot-toast';

import { getAllEmployees }   from '../services/api';
import PersonalDetailsForm  from '../components/PersonalDetailsForm';
import EmployeeTable        from '../components/EmployeeTable';
import EditModal            from '../components/EditModal';
import ConfirmDeleteModal   from '../components/ConfirmDeleteModal';

/**
 * Home page — Employee Personal Details management.
 * Handles all state: employee list, pagination, modal visibility.
 */
export default function Home() {
  const [employees,        setEmployees]        = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [employeeToEdit,   setEmployeeToEdit]   = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Fetch all employees from the backend
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllEmployees();
      setEmployees(res.data.data);
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Failed to fetch records';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Stat cards config
  const stats = [
    {
      label: 'Total Employees',
      value: employees.length,
      icon: Users,
    },
    {
      label: 'IT Department',
      value: employees.filter((e) => e.department === 'IT').length,
      icon: Code2,
    },
    {
      label: 'HR Department',
      value: employees.filter((e) => e.department === 'HR').length,
      icon: Briefcase,
    },
    {
      label: 'Other Depts',
      value: employees.filter((e) => !['IT', 'HR'].includes(e.department)).length,
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Top Navigation ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                HR Management System
              </h1>
              <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Employee Personal Details
              </p>
            </div>
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchEmployees}
            disabled={loading}
            aria-label="Refresh employee records"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      {/* ── Page Content ────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Page heading */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Personal Details
          </h2>
          <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Manage and track all employee information in one place.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white border border-gray-200 p-5">
                <Icon className="w-5 h-5 text-gray-400 mb-3" />
                <p
                  className="text-2xl font-bold text-gray-900"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs text-gray-400 font-medium mt-0.5"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Add Employee Form */}
        <PersonalDetailsForm onEmployeeAdded={fetchEmployees} />

        {/* Employee Records Table */}
        <EmployeeTable
          employees={employees}
          loading={loading}
          onEdit={(emp)   => setEmployeeToEdit(emp)}
          onDelete={(emp) => setEmployeeToDelete(emp)}
        />
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer
        className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-8"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        HR Personal Details System &middot; SNS IHUB
      </footer>

      {/* ── Modals ──────────────────────────────────────────────── */}
      {employeeToEdit && (
        <EditModal
          employee={employeeToEdit}
          onClose={() => setEmployeeToEdit(null)}
          onUpdated={fetchEmployees}
        />
      )}
      {employeeToDelete && (
        <ConfirmDeleteModal
          employee={employeeToDelete}
          onClose={() => setEmployeeToDelete(null)}
          onDeleted={fetchEmployees}
        />
      )}
    </div>
  );
}
