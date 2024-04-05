import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addToCart } from "../action/productSlicer";
import { toast } from "react-toastify";

function Product(props: any) {
  const { id, title, description, price, rating, thumbnail } = props.product;
  let dispatch = useDispatch<AppDispatch>();

  async function handleAddToCart(id: number) {
    let { data } = await axios(`https://dummyjson.com/products/${id}`);
    console.log(data);
    dispatch(addToCart(data));
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} />
      <div className="product-details">
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Rating: {rating}</p>
        <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
