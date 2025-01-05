// import style from "./VisualReports.module.css"
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const VisualReports = ({ transactions }) => {
  const [chartData, setChartData] = useState({ pie: null, bar: null });

  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const categoryData = transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      }
      return acc;
    }, {});

    const pie = {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };

    const bar = {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryData),
          backgroundColor: "#FF6384",
        },
      ],
    };

    setChartData({ pie, bar });
  }, [transactions]);

  return (
    <div>
      <h2>Visual Reports</h2>
      {chartData.pie && <Pie data={chartData.pie} />}
      {chartData.bar && <Bar data={chartData.bar} />}
    </div>
  );
};

export default VisualReports;
