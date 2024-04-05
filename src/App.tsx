import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/products" Component={Products} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
