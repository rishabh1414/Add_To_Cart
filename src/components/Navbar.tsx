import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import "./Navbar.css";

function Navbar() {
  let cart = useSelector((state: RootState) => state.cart);
  return (
    <nav>
      <div className="logo">LOGO HERE</div>
      <div className="links">
        <Link to="#">Home</Link>
        <Link to="#">About</Link>
        <Link to="/products">Products</Link>
      </div>
      <div className="cartBtn">
        <Link to="/cart">
          <span className="material-symbols-outlined">shopping_cart</span>
          <sup>{cart.length}</sup>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
