import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import {
  Home,
  AddTransaction,
  TransactionList,
  VisualReports,
} from "./Pages/index";
import { Header, Mode } from "./Components/index";

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/reports" element={<VisualReports />} />
        </Routes>
      </Router>
      <Mode onClick={toggleTheme} />
    </>
  );
};

export default App;
