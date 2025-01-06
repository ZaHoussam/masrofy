import style from "./VisualReports.module.css";
import { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import csv from "../../assets/csv.png";
import pdf from "../../assets/pdf.png";
import { NotFoundData } from "../../Components/index";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

const VisualReports = ({ transactions }) => {
  const [chartData, setChartData] = useState({ doughnut: null, line: null });

  useEffect(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const categoryData = transactions.reduce(
      (acc, t) => {
        if (t.type === "expense") {
          acc.expenses[t.category] =
            (acc.expenses[t.category] || 0) + parseFloat(t.amount);
        } else if (t.type === "income") {
          acc.income[t.category] =
            (acc.income[t.category] || 0) + parseFloat(t.amount);
        }
        return acc;
      },
      { expenses: {}, income: {} }
    );

    const doughnutData = {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };

    const incomeDataOverTime = [];
    const expenseDataOverTime = [];
    const dates = [];

    transactions.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString();
      const amount = parseFloat(t.amount);
      if (t.type === "income") {
        incomeDataOverTime.push(amount);
        expenseDataOverTime.push(0);
      } else if (t.type === "expense") {
        incomeDataOverTime.push(0);
        expenseDataOverTime.push(amount);
      }

      if (!dates.includes(date)) {
        dates.push(date);
      }
    });

    const lineData = {
      labels: dates,
      datasets: [
        {
          label: "Income",
          data: incomeDataOverTime,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
        {
          label: "Expenses",
          data: expenseDataOverTime,
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
      ],
    };

    setChartData({ doughnut: doughnutData, line: lineData });
  }, [transactions]);

  const downloadCSV = () => {
    const csv = Papa.unparse(transactions); // Convert transactions to CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  // Function to download PDF
  const downloadPDF = (transactions) => {
    const doc = new jsPDF();

    // Table headers
    const columns = ["Name", "Category", "Amount", "Type", "Date"];

    // Map the transactions to table rows
    const rows = transactions.map((transaction) => [
      transaction.name,
      transaction.category,
      transaction.amount,
      transaction.type,
      transaction.date,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("transactions-data.pdf");
  };

  return (
    <section className={style.reports}>
      <div className="container">
        {transactions.length !== 0 ? (
          <div className={style["report-content"]}>
            <h1 className={style.title}>Visual Reports</h1>
            <div className={style.charts}>
              <div className={style["chart-container"]}>
                {chartData.doughnut && <Doughnut data={chartData.doughnut} />}
              </div>
              <div className={style["chart-container"]}>
                {chartData.line && <Line data={chartData.line} />}
              </div>
            </div>
            <div className={style["download-buttons"]}>
              <button onClick={downloadCSV} className={style.downloadButton}>
                <span className={style.button__text}>Download</span>
                <span className={style.button__icon}>
                  <img src={csv} alt="csv" />
                </span>
              </button>
              <button
                onClick={() => downloadPDF(transactions)}
                className={style.downloadButton}
              >
                <span className={style.button__text}>Download</span>
                <span className={style.button__icon}>
                  <img src={pdf} alt="csv" />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <NotFoundData />
        )}
      </div>
    </section>
  );
};

export default VisualReports;
