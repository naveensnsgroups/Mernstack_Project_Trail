import { useState } from 'react';
import { UserPlus, Loader2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { createEmployee } from '../services/api';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales', 'Admin', 'Other'];
const GENDERS     = ['Male', 'Female', 'Other'];

const initialState = {
  fullName: '', employeeId: '', email: '', phone: '',
  dateOfBirth: '', gender: '', address: '',
  department: '', position: '', joinDate: '',
};

const FIELDS = [
  { name: 'fullName',    label: 'Full Name',           type: 'text',  placeholder: 'e.g. John Doe',         required: true },
  { name: 'employeeId',  label: 'Employee ID',          type: 'text',  placeholder: 'e.g. EMP001',            required: true },
  { name: 'email',       label: 'Email Address',        type: 'email', placeholder: 'john@company.com',       required: true },
  { name: 'phone',       label: 'Phone Number',         type: 'tel',   placeholder: '+91 9876543210',         required: true },
  { name: 'dateOfBirth', label: 'Date of Birth',        type: 'date' },
  { name: 'position',    label: 'Position / Job Title', type: 'text',  placeholder: 'e.g. Software Engineer' },
  { name: 'joinDate',    label: 'Join Date',            type: 'date' },
];

const validate = (formData) => {
  const errors = {};
  if (!formData.fullName.trim())   errors.fullName   = 'Full name is required';
  if (!formData.employeeId.trim()) errors.employeeId = 'Employee ID is required';
  if (!formData.email.trim())      errors.email      = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
  if (!formData.phone.trim())      errors.phone      = 'Phone is required';
  else if (!/^[+\d][\d\s\-()\\.]{6,19}$/.test(formData.phone)) errors.phone = 'Invalid phone number';
  return errors;
};

// Shared input class
const inputCls = (hasError) =>
  `w-full border ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'} px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black transition-colors font-sans`;

export default function PersonalDetailsForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState(initialState);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleReset = () => { setFormData(initialState); setErrors({}); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await createEmployee(formData);
      toast.success('Employee added successfully!');
      handleReset();
      onEmployeeAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
        <UserPlus className="w-4 h-4 text-gray-600" />
        <div>
          <h2 className="text-sm font-bold text-gray-900">Add New Employee</h2>
          <p className="text-xs text-gray-400">Fields marked * are required</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">

          {FIELDS.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                className={inputCls(!!errors[field.name])}
              />
              {errors[field.name] && (
                <p role="alert" className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Gender</label>
            <div className="relative">
              <select
                id="gender" name="gender" value={formData.gender} onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:border-black transition-colors pr-8 font-sans"
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Department</label>
            <div className="relative">
              <select
                id="department" name="department" value={formData.department} onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 appearance-none focus:outline-none focus:border-black transition-colors pr-8 font-sans"
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2 lg:col-span-3">
            <label htmlFor="address" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Address</label>
            <textarea
              id="address" name="address" value={formData.address} onChange={handleChange}
              placeholder="Enter full residential address..." rows={2}
              className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black resize-none transition-colors font-sans"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-5 pt-4 border-t border-gray-200 gap-3">
          <button
            type="button" onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {loading ? 'Saving...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}
