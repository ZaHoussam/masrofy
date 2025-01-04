import style from "./Home.module.css";

const Home = () => {
  return (
    <section className={style.home}>
      <h1>Welcome to Masroofy</h1>
      <p>Total Income: DZD 0</p>
      <p>Total Expenses: DZD 0</p>
      <p>Balance: DZD 0</p>
    </section>
  );
};
export default Home;
