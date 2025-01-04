import { NavLink } from "react-router";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <NavLink to="/" className={style.logo}>
        Masroofy
      </NavLink>
      <ul className={style.navigation}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-transaction">Add Transaction</NavLink>
        </li>
        <li>
          <NavLink to="/transactions">Transaction List</NavLink>
        </li>
        <li>
          <NavLink to="/reports">Visual Reports</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
