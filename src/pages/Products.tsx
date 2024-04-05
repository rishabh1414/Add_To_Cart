import React, { useEffect } from "react";
import Product from "../components/Product";
import { fetchProducts } from "../action/productSlicer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./Products.css";

function Products() {
  let productData = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
    console.log("first");
  }, []);
  return (
    <div className="product-list">
      {productData.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
