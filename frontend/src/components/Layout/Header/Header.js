import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../store/Auth-Context";
import "../../../styles/Header.css";
function Header() {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    ctx.onLogout();
    history.push("/auth");
  };
  return (
    <nav className="nav">
      <div className="logo nav__item">
        <NavLink to="/">ReBuy</NavLink>
      </div>
      <ul className="nav__list">
        {ctx.isLoggedIn ? (
          <>
            <li className="nav__item action">
              <NavLink to="/addProduct">Add Product</NavLink>
            </li>
            <li className="nav__item mobile__add">
              <NavLink to="/addProduct">
                <i className="fas fa-plus-square"></i>
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/myAccount">Account</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/myOrders">Orders</NavLink>
            </li>
            <li className="nav__item">
              <p onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
              </p>
            </li>
          </>
        ) : (
          <li className="nav__item">
            <NavLink to="/auth">Login/Signup</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
