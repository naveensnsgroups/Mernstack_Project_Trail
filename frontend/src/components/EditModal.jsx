import { useState, useEffect, useCallback } from 'react';
import { X, Save, Loader2, Pencil, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateEmployee } from '../services/api';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Admin', 'Other'];
const GENDERS     = ['Male', 'Female', 'Other'];

const FIELDS = [
  { name: 'fullName',    label: 'Full Name',           type: 'text',  placeholder: 'e.g. John Doe' },
  { name: 'employeeId',  label: 'Employee ID',          type: 'text',  placeholder: 'e.g. EMP001' },
  { name: 'email',       label: 'Email Address',        type: 'email', placeholder: 'john@company.com' },
  { name: 'phone',       label: 'Phone Number',         type: 'tel',   placeholder: '+91 9876543210' },
  { name: 'dateOfBirth', label: 'Date of Birth',        type: 'date' },
  { name: 'position',    label: 'Position / Job Title', type: 'text',  placeholder: 'Software Engineer' },
  { name: 'joinDate',    label: 'Join Date',            type: 'date' },
];

const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
};

const validate = (formData) => {
  const errors = {};
  if (!formData.fullName?.trim())   errors.fullName   = 'Full name is required';
  if (!formData.employeeId?.trim()) errors.employeeId = 'Employee ID is required';
  if (!formData.email?.trim())      errors.email      = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
  if (!formData.phone?.trim())      errors.phone      = 'Phone is required';
  return errors;
};

const inputCls = (hasError) =>
  `w-full border ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'} px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors font-sans`;

export default function EditModal({ employee, onClose, onUpdated }) {
  const [formData, setFormData] = useState({});
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName:    employee.fullName    || '',
        employeeId:  employee.employeeId  || '',
        email:       employee.email       || '',
        phone:       employee.phone       || '',
        dateOfBirth: formatDateForInput(employee.dateOfBirth),
        gender:      employee.gender      || '',
        address:     employee.address     || '',
        department:  employee.department  || '',
        position:    employee.position    || '',
        joinDate:    formatDateForInput(employee.joinDate),
      });
      setErrors({});
    }
  }, [employee]);

  const handleKeyDown = useCallback((e) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await updateEmployee(employee._id, formData);
      toast.success('Employee updated successfully!');
      onUpdated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      role="dialog" aria-modal="true" aria-labelledby="edit-modal-title"
    >
      <div className="modal-enter bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-300 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-gray-600" />
            <div>
              <h3 id="edit-modal-title" className="text-sm font-bold text-gray-900">Edit Employee</h3>
              <p className="text-xs text-gray-400">{employee?.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label htmlFor={`edit-${field.name}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {field.label}
                </label>
                <input
                  id={`edit-${field.name}`}
                  type={field.type} name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={inputCls(!!errors[field.name])}
                />
                {errors[field.name] && (
                  <p role="alert" className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <label htmlFor="edit-gender" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Gender</label>
              <div className="relative">
                <select id="edit-gender" name="gender" value={formData.gender || ''} onChange={handleChange}
                  className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:border-black pr-8 font-sans">
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div>
              <label htmlFor="edit-department" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Department</label>
              <div className="relative">
                <select id="edit-department" name="department" value={formData.department || ''} onChange={handleChange}
                  className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:border-black pr-8 font-sans">
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label htmlFor="edit-address" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Address</label>
              <textarea id="edit-address" name="address" value={formData.address || ''} onChange={handleChange}
                rows={2} placeholder="Enter full address..."
                className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black resize-none font-sans" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
