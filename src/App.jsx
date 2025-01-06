import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState } from "react";
import {
  Home,
  AddTransaction,
  TransactionList,
  VisualReports,
} from "./Pages/index";
import { Header } from "./Components/index";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const editTransaction = (index, updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction, i) =>
      i === index ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home transactions={transactions} />} />
        <Route
          path="/add-transaction"
          element={<AddTransaction addTransaction={addTransaction} />}
        />
        <Route
          path="/transactions"
          element={
            <TransactionList
              transactions={transactions}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          }
        />
        <Route
          path="/reports"
          element={<VisualReports transactions={transactions} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
