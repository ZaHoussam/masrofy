import { useState } from "react";
const AddTransaction = () => {
  const [transaction, setTransaction] = useState({
    name: "",
    amount: 0,
    date: "",
    category: "",
    notes: "",
    type: "income",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transaction);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Transaction Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        onChange={handleChange}
      />
      <input type="date" name="date" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option value="Groceries">Groceries</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <textarea name="notes" placeholder="Notes" onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};
export default AddTransaction;
