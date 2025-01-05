import style from "./Home.module.css";
import { useEffect, useState } from "react";

const Home = ({ transactions }) => {
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    setTotals({ totalIncome, totalExpenses, balance });
  }, [transactions]);

  return (
    <section className={style.home}>
      <div className="container">
        <h1 className={style.title}>Welcome to Masroofy</h1>
        <div className={style.content}>
          <div className={style.card}>
            Total Income:
            <span className={style.price}>
              {totals.totalIncome.toFixed(2)} DZD
            </span>
          </div>
          <div className={style.card}>
            Total Expenses:
            <span className={style.price}>
              {totals.totalExpenses.toFixed(2)} DZD
            </span>
          </div>
          <div className={style.card}>
            Balance:
            <span className={style.price}>{totals.balance.toFixed(2)} DZD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
