import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { name: 'Raj Patel', role: 'Site Engineer', responsibility: 'Monitor site', attendance: 'Present' },
    { name: 'Anjali Mehta', role: 'Supervisor', responsibility: 'Manage materials', attendance: 'Absent' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    responsibility: '',
    attendance: 'Present',
  });

  const [view, setView] = useState('Today');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees([...employees, formData]);
    setFormData({ name: '', role: '', responsibility: '', attendance: 'Present' });
  };

  const getChartData = () => {
    let data = [];
    if (view === 'Today') {
      const present = employees.filter(emp => emp.attendance === 'Present').length;
      const absent = employees.filter(emp => emp.attendance === 'Absent').length;
      const leave = employees.filter(emp => emp.attendance === 'Leave').length;
      data = [{ name: 'Today', Present: present, Absent: absent, Leave: leave }];
    } else if (view === 'Monthly') {
      data = [
        { name: 'Week 1', Present: 15, Absent: 4, Leave: 2 },
        { name: 'Week 2', Present: 17, Absent: 2, Leave: 1 },
        { name: 'Week 3', Present: 14, Absent: 5, Leave: 3 },
        { name: 'Week 4', Present: 16, Absent: 3, Leave: 1 },
      ];
    } else if (view === 'Yearly') {
      data = [
        { name: 'Jan', Present: 160, Absent: 20, Leave: 10 },
        { name: 'Feb', Present: 145, Absent: 25, Leave: 8 },
        { name: 'Mar', Present: 155, Absent: 15, Leave: 6 },
        // add more months if needed
      ];
    }
    return data;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Employee Management</h2>

      {/* Assign Roles & Responsibilities */}
      <form onSubmit={handleAddEmployee} className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="Site Engineer">Site Engineer</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Electrician">Electrician</option>
          <option value="Architect">Architect</option>
        </select>

        <select
          name="responsibility"
          value={formData.responsibility}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Responsibility</option>
          <option value="Monitor site">Monitor site</option>
          <option value="Manage materials">Manage materials</option>
          <option value="Handle wiring">Handle wiring</option>
          <option value="Design blueprints">Design blueprints</option>
        </select>

        <select
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>
        </select>

        <button
          type="submit"
          className="md:col-span-4 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>

      {/* Employee Table */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-200 uppercase text-sm">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Responsibility</th>
              <th className="py-3 px-4">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="py-3 px-4">{emp.name}</td>
                <td className="py-3 px-4">{emp.role}</td>
                <td className="py-3 px-4">{emp.responsibility}</td>
                <td className={`py-3 px-4 font-semibold ${
                  emp.attendance === 'Present' ? 'text-green-600' :
                  emp.attendance === 'Absent' ? 'text-red-600' :
                  'text-yellow-500'
                }`}>
                  {emp.attendance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Track Attendance - Line Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Track Attendance</h3>
          <div className="space-x-2">
            {['Today', 'Monthly', 'Yearly'].map((type) => (
              <button
                key={type}
                onClick={() => setView(type)}
                className={`px-4 py-1 rounded ${
                  view === type ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Present" stroke="#34D399" strokeWidth={2} />
            <Line type="monotone" dataKey="Absent" stroke="#F87171" strokeWidth={2} />
            <Line type="monotone" dataKey="Leave" stroke="#FBBF24" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeManagement;
