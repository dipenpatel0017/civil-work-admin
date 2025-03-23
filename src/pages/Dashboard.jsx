// src/pages/Dashboard.jsx
import React from "react";
import { FiUsers, FiTrendingDown, FiSmile } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [selectedDate, setSelectedDate] = React.useState(15);

  const scheduleData = {
    15: [
      { time: "9:00 AM – 9:30 AM", event: "Morning Briefing" },
      { time: "10:00 AM – 11:30 AM", event: "Project Review Meeting" },
      { time: "11:30 AM – 1:00 PM", event: "Marketing Strategy Session" },
    ],
    16: [
      { time: "10:00 AM – 11:00 AM", event: "Site Visit Coordination" },
      { time: "2:00 PM – 3:00 PM", event: "Contractor Call" },
    ],
    20: [{ time: "3:00 PM – 4:30 PM", event: "Team Performance Sync" }],
  };

  const stats = [
    { title: "Total Employees", value: "1,242", icon: <FiUsers size={24} /> },
    { title: "Turnover Rate", value: "32%", icon: <FiTrendingDown size={24} /> },
    { title: "Happiness Rate", value: "78%", icon: <FiSmile size={24} /> },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Team KPI",
        data: [65, 59, 80, 81, 56, 84],
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#9CA3AF" } },
    },
    scales: {
      x: { ticks: { color: "#9CA3AF" } },
      y: { ticks: { color: "#9CA3AF" } },
    },
  };

  const taskList = [
    {
      title: "Update Employee Handbook",
      department: "Policy Development",
      date: "April 17, 2025",
      progress: 45,
    },
    {
      title: "Finalize Quarterly Budget Review",
      department: "Financial Analysis",
      date: "May 30, 2027",
      progress: 66,
    },
  ];

  const satisfactionData = {
    labels: ["Satisfaction", "Remaining"],
    datasets: [
      {
        data: [84, 16],
        backgroundColor: ["#f97316", "#f3f4f6"],
        cutout: "80%",
      },
    ],
  };

  const employeeStatusData = {
    labels: ["Active", "On Leave", "Contract"],
    datasets: [
      {
        data: [824, 213, 205],
        backgroundColor: ["#3b82f6", "#f97316", "#e5e7eb"],
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      {/* Top Summary Section */}
      <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500 dark:text-gray-300">{today}</p>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hello, Matt! 👋</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Track & manage your team progress here</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl w-64"
            >
              <div className="bg-orange-100 dark:bg-orange-600 text-orange-600 dark:text-white p-2 rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{item.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Average Team KPI
          </h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Interactive Calendar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Schedule - June 2027
          </h2>
          <div className="grid grid-cols-7 text-xs gap-1 mt-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
              <div key={i} className="font-semibold text-gray-700 dark:text-gray-300">{d}</div>
            ))}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 rounded-full transition-colors ${
                    selectedDate === day
                      ? "bg-blue-500 text-white font-bold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
            <p>📅 {selectedDate} April 25 </p>
            <ul className="list-disc list-inside mt-2">
              {scheduleData[selectedDate]?.length ? (
                scheduleData[selectedDate].map((item, idx) => (
                  <li key={idx}>{item.time} – {item.event}</li>
                ))
              ) : (
                <li>No events scheduled.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {/* Tasks */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tasks</h2>
          <div className="space-y-4">
            {taskList.map((task, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{task.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {task.department} • {task.date}
                  </p>
                </div>
                <div className="w-10 h-10 relative">
                  <svg className="absolute top-0 left-0" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200 dark:text-gray-600"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-orange-500"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray={`${task.progress}, 100`}
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-white">
                    {task.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Satisfaction */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Employee Satisfaction</h2>
          <div className="w-32 h-32">
            <Doughnut data={satisfactionData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <p className="text-2xl font-bold mt-2 text-orange-500">84</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">NPS Score</p>
        </div>

        {/* Employment Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Employment Status</h2>
          <div className="w-32 h-32">
            <Doughnut data={employeeStatusData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <p className="text-xl font-bold mt-2 text-gray-700 dark:text-white">1,242</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Total Employees</p>
        </div>

        {/* Schedule Preview (Right Side) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {selectedDate} June 2027
          </h2>
          <div className="text-sm space-y-4">
            {scheduleData[selectedDate]?.length ? (
              scheduleData[selectedDate].map((item, idx) => (
                <div key={idx}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                  <p className="text-gray-800 dark:text-white font-semibold">{item.event}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No events scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
