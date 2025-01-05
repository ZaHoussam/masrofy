// import style from "./TransactionList.moudle.css"
import { useState } from "react";

const TransactionList = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTransaction(transactions[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTransaction({ ...editingTransaction, [name]: value });
  };

  const saveEdit = () => {
    editTransaction(editingIndex, editingTransaction);
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editingTransaction.name}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="amount"
                  value={editingTransaction.amount}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="date"
                  value={editingTransaction.date}
                  onChange={handleEditChange}
                />
                <select
                  name="category"
                  value={editingTransaction.category}
                  onChange={handleEditChange}
                >
                  <option value="Groceries">Groceries</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <span>
                {transaction.date} - {transaction.name} - DZD{" "}
                {transaction.amount} - {transaction.category} (
                {transaction.type})
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTransaction(index)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
