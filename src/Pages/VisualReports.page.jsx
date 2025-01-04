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

const VisualReports = () => {
  const pieData = {
    labels: ["Groceries", "Transportation", "Entertainment"],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Income",
        data: [1200, 1500, 800],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expenses",
        data: [900, 700, 400],
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div>
      <h2>Visual Reports</h2>
      <Pie data={pieData} />
      <Bar data={barData} />
    </div>
  );
};

export default VisualReports;
