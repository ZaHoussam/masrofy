import { NavLink } from "react-router";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header_content}>
          <NavLink to="/" className={style.logo}>
            Masroofy
          </NavLink>
          <ul className={style.navigation}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.navLink}` : style.navLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-transaction"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.navLink}` : style.navLink
                }
              >
                Add Transaction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.navLink}` : style.navLink
                }
              >
                Transaction List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? `${style.active} ${style.navLink}` : style.navLink
                }
              >
                Visual Reports
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
