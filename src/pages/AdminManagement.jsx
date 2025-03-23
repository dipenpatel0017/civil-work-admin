import React, { useEffect, useState } from 'react';

const AdminManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Random dummy data generator
  const generateDummyEmployees = () => {
    const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Johnson', 'David Wilson'];
    const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];
    const dummy = names.map((name, i) => ({
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      department: departments[i % departments.length],
    }));
    setEmployees(dummy);
  };

  useEffect(() => {
    generateDummyEmployees(); // Load initial data
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = formData;
      setEmployees(updatedEmployees);
      setEditIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }
    setFormData({ name: '', email: '', department: '' });
  };

  const handleEdit = (index) => {
    setFormData(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = employees.filter((_, i) => i !== index);
    setEmployees(filtered);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="md:col-span-3 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {editIndex !== null ? 'Update' : 'Add'} Employee
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-200 uppercase text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="py-3 px-4">{emp.name}</td>
                <td className="py-3 px-4">{emp.email}</td>
                <td className="py-3 px-4">{emp.department}</td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No employee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagement;
