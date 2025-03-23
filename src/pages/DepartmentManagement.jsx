import React, { useState } from 'react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { name: 'Construction', head: 'Raj Patel' },
    { name: 'Architecture', head: 'Anjali Mehta' },
    { name: 'Design', head: '' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    head: '',
  });

  const [successMsg, setSuccessMsg] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.head) return;

    setDepartments([...departments, formData]);
    setFormData({ name: '', head: '' });

    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  // Filtered Departments based on selector
  const filteredDepartments =
    selectedFilter === 'All'
      ? departments
      : departments.filter((dept) => dept.name === selectedFilter);

  const totalDepartments = departments.length;
  const assignedRoles = departments.filter((dept) => dept.head !== '').length;

  // Get unique department names for selector
  const uniqueDepartmentNames = [
    'All',
    ...new Set(departments.map((dept) => dept.name)),
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🏢 Department Management</h2>

      {/* ✅ Success Message */}
      {successMsg && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-400 transition-all duration-500">
          ✅ Department successfully added!
        </div>
      )}

      {/* Create Department Form */}
      <form
        onSubmit={handleAddDepartment}
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="head"
          value={formData.head}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Assign Department Head</option>
          <option value="Raj Patel">Raj Patel</option>
          <option value="Anjali Mehta">Anjali Mehta</option>
          <option value="Sohan Desai">Sohan Desai</option>
          <option value="Priya Shah">Priya Shah</option>
        </select>
        <button
          type="submit"
          className="md:col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>

      {/* Department Filter Dropdown */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Department:</label>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {uniqueDepartmentNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Department Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow mb-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase">
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Department Head</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map((dept, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="py-3 px-4 font-medium">{dept.name}</td>
                <td className="py-3 px-4">
                  {dept.head ? dept.head : <span className="text-gray-400 italic">Unassigned</span>}
                </td>
              </tr>
            ))}
            {filteredDepartments.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-gray-500 py-4">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📊 Stats Section */}
      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-200">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h4 className="font-semibold text-md mb-2">📁 Total Departments</h4>
          <p className="text-lg font-bold">{totalDepartments}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h4 className="font-semibold text-md mb-2">✅ Assigned Heads</h4>
          <p className="text-lg font-bold">{assignedRoles}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
