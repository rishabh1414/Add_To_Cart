import React, { useState } from "react";
import Product from "../components/Product";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import {
  SetQuantityByInput,
  decrementQuantity,
  getTotalPrice,
  incrementQuantity,
  removeFromCart,
} from "../action/productSlicer";
import { Navigate, useNavigate } from "react-router-dom";

function Cart() {
  let cart = useSelector((state: RootState) => state.cart);
  const [selectedNumber, setSelectedNumber] = useState<number | string | null>(
    null
  );
  let navigate = useNavigate();
  const totalPrice = getTotalPrice(cart);

  let dispatch = useDispatch<AppDispatch>();

  function handleDecrement(myID: number) {
    let index = cart.findIndex((item) => item.id === myID);

    console.log(cart[index].quantity);
    if (cart[index].quantity - 1 === 0) {
      dispatch(removeFromCart(myID));
    } else {
      dispatch(decrementQuantity(myID));
    }
  }

  const handleNumberChange = (id: number, quantity: string) => {
    dispatch(SetQuantityByInput({ id, quantity }));
    setSelectedNumber(quantity);
    console.log(selectedNumber);
  };
  return (
    <>
      {cart.length === 0 ? (
        <>
          <div className="notProductInCart">
            <h1>No Product Here</h1>
            <button onClick={() => navigate("/products")}>
              Go for Shopping
            </button>
          </div>
        </>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div className="cart-item">
              <div className="product-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove From Cart
                </button>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <select
                  id="numberSelect"
                  value={selectedNumber || ""}
                  onChange={(e) => {
                    handleNumberChange(item.id, e.target.value);
                  }}
                >
                  {[...Array(12)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h2>Total: ${totalPrice}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
