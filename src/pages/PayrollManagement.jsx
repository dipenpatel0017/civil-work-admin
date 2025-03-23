import React, { useState } from 'react';
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const PayrollManagement = () => {
  const [payrollData, setPayrollData] = useState([
    { name: 'Raj Patel', basic: 20000, pf: 1500, bonus: 2000, leaves: 2 },
    { name: 'Anjali Mehta', basic: 18000, pf: 1300, bonus: 1500, leaves: 1 },
    { name: 'Sohan Desai', basic: 22000, pf: 1700, bonus: 1800, leaves: 3 },
    { name: 'Priya Shah', basic: 19500, pf: 1400, bonus: 1200, leaves: 0 },
    { name: 'Vikram Rana', basic: 21000, pf: 1600, bonus: 1600, leaves: 2 },
    { name: 'Kavita Joshi', basic: 18500, pf: 1200, bonus: 1000, leaves: 4 },
    { name: 'Arjun Trivedi', basic: 23000, pf: 1800, bonus: 2000, leaves: 2 },
    { name: 'Divya Chauhan', basic: 17500, pf: 1100, bonus: 900, leaves: 1 },
    { name: 'Ravi Panchal', basic: 19000, pf: 1250, bonus: 1100, leaves: 3 },
    { name: 'Sneha Bhatt', basic: 20000, pf: 1350, bonus: 1500, leaves: 2 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    basic: '',
    pf: '',
    bonus: '',
    leaves: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPayroll = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.basic || !formData.pf || formData.leaves === '') return;

    setPayrollData([
      ...payrollData,
      {
        name: formData.name,
        basic: parseFloat(formData.basic),
        pf: parseFloat(formData.pf),
        bonus: parseFloat(formData.bonus || 0),
        leaves: parseInt(formData.leaves),
      },
    ]);

    setFormData({ name: '', basic: '', pf: '', bonus: '', leaves: '' });
  };

  const calculateSalary = ({ basic, pf, bonus, leaves }) => {
    const gross = basic + bonus;
    const perDay = gross / 30;
    const leaveDeduction = perDay * leaves;
    return Math.round(gross - leaveDeduction - pf);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CurrencyRupeeIcon className="h-7 w-7 text-green-600" />
        <h2 className="text-2xl font-bold">Payroll Management</h2>
      </div>

      {/* Add Payroll Form */}
      <form
        onSubmit={handleAddPayroll}
        className="grid md:grid-cols-6 sm:grid-cols-2 gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="basic"
          placeholder="Basic Salary"
          value={formData.basic}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="pf"
          placeholder="Provident Fund (PF)"
          value={formData.pf}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="bonus"
          placeholder="Bonus"
          value={formData.bonus}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="leaves"
          placeholder="Leave Days"
          value={formData.leaves}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded col-span-full md:col-span-1"
        >
          Add Salary
        </button>
      </form>

      {/* Payroll Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase">
              <th className="py-3 px-4 text-left">Employee</th>
              <th className="py-3 px-4 text-left">Basic</th>
              <th className="py-3 px-4 text-left">PF</th>
              <th className="py-3 px-4 text-left">Bonus</th>
              <th className="py-3 px-4 text-left">Leaves</th>
              <th className="py-3 px-4 text-left">Final Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((employee, index) => (
              <tr key={index} className="border-t dark:border-gray-700">
                <td className="py-3 px-4 font-medium">{employee.name}</td>
                <td className="py-3 px-4">₹{employee.basic.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4">₹{employee.pf.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4">₹{employee.bonus.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4">{employee.leaves}</td>
                <td className="py-3 px-4 font-bold text-green-700 dark:text-green-400">
                  ₹{calculateSalary(employee).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
            {payrollData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No payroll data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollManagement;
