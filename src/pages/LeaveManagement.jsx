import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const initialLeaves = [
  { id: 1, name: "Raj Patel", role: "Site Engineer", reason: "Medical", status: "Pending" },
  { id: 2, name: "Anjali Mehta", role: "Supervisor", reason: "Personal", status: "Pending" },
  { id: 3, name: "Sohan Desai", role: "Worker", reason: "Festival", status: "Pending" },
  { id: 4, name: "Priya Shah", role: "Architect", reason: "Family Event", status: "Pending" },
  { id: 5, name: "Amit Joshi", role: "Foreman", reason: "Vacation", status: "Pending" },
  { id: 6, name: "Nisha Vora", role: "Planner", reason: "Medical", status: "Approved" },
  { id: 7, name: "Manish Singh", role: "Supervisor", reason: "Marriage", status: "Rejected" },
  { id: 8, name: "Deepika Rana", role: "Interior Designer", reason: "Personal", status: "Pending" },
  { id: 9, name: "Karan Thakkar", role: "Mason", reason: "Medical", status: "Approved" },
  { id: 10, name: "Rekha Verma", role: "Surveyor", reason: "Emergency", status: "Rejected" },
  { id: 11, name: "Jay Shah", role: "Electrician", reason: "Festival", status: "Pending" },
  { id: 12, name: "Sneha Ghosh", role: "HR", reason: "Vacation", status: "Pending" },
  { id: 13, name: "Arjun Deshmukh", role: "Site Assistant", reason: "Family Function", status: "Pending" },
  { id: 14, name: "Pooja Iyer", role: "Designer", reason: "Health Issue", status: "Pending" },
  { id: 15, name: "Vivek Nair", role: "Admin", reason: "Official", status: "Pending" },
];

const COLORS = {
  Pending: "#facc15", // amber
  Approved: "#22c55e", // green
  Rejected: "#ef4444", // red
};

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaves);
  const [message, setMessage] = useState("");

  const handleAction = (id, action) => {
    const updated = leaveRequests.map((req) =>
      req.id === id ? { ...req, status: action } : req
    );
    setLeaveRequests(updated);
    setMessage(`✅ Employee leave ${action === "Approved" ? "approved" : "rejected"} successfully!`);
    setTimeout(() => setMessage(""), 4000);
  };

  const getStatusCount = (status) =>
    leaveRequests.filter((r) => r.status === status).length;

  const pieData = [
    { name: "Pending", value: getStatusCount("Pending") },
    { name: "Approved", value: getStatusCount("Approved") },
    { name: "Rejected", value: getStatusCount("Rejected") },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Employee Leave Requests & Approval</h2>

      {/* ✅ Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Leave Status Overview</h3>
        <ResponsiveContainer width="100%" height={290}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${name}: ${value}`}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} Employee(s)`, `${name}`]}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Message */}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-400 transition-all duration-500">
          {message}
        </div>
      )}

      {/* ✅ Leave Requests Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req) => (
              <tr key={req.id} className="border-t dark:border-gray-700">
                <td className="py-3 px-4 font-medium">{req.name}</td>
                <td className="py-3 px-4">{req.role}</td>
                <td className="py-3 px-4">{req.reason}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {req.status}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleAction(req.id, "Approved")}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "Rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No leave requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
