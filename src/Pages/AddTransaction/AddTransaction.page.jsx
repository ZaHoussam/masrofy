import style from "./AddTransaction.module.css";
import { useState } from "react";
import transactionImg from "../../assets/transaction.png";

// * Function
const AddTransaction = ({ addTransaction }) => {
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    type: "income",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      transaction.name &&
      transaction.amount &&
      transaction.date &&
      transaction.category
    ) {
      addTransaction(transaction);
      alert("Transaction added successfully!");
      setTransaction({
        name: "",
        amount: "",
        date: "",
        category: "",
        type: "income",
      });
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <section className={style.transaction}>
      <div className="container">
        <div className={style.transaction_content}>
          <div className={style.info}>
            <h1 className="title">Sign In to Recharge Direct</h1>
            <p className="desc">if you don't have an account you can</p>
          </div>
          <div className={style.image}>
            <img src={transactionImg} alt="transaction" />
          </div>
          <div className={style.action}>
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.input}>
                <input
                  type="text"
                  name="name"
                  placeholder="Transaction Name"
                  value={transaction.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.input}>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={style.input}>
                <input
                  type="date"
                  name="date"
                  value={transaction.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <select
                name="category"
                value={transaction.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={transaction.type === "income"}
                    onChange={handleChange}
                  />
                  Income
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={transaction.type === "expense"}
                    onChange={handleChange}
                  />
                  Expense
                </label>
              </div>
              <div className={style.input}>
                <input type="submit" value="Add Transaction" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
// * Export
export default AddTransaction;
