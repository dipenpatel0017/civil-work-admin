// Chart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Work Progress",
      data: [65, 59, 80, 81, 56, 75],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Work Progress",
    },
  },
};

const Chart = () => {
  return <Line data={data} options={options} />;
};

export default Chart;
