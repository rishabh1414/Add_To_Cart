import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "../Interfaces";
import axios from "axios";
import { toast } from "react-toastify";

interface ProductsState {
  products: ProductInterface[];
  cart: ProductInterface[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    console.log("first");
    return data.products;
  }
);

const initialState: ProductsState = {
  products: [],
  cart: [],
  status: "idle",
  error: null,
};
export const getTotalPrice = (cart: ProductInterface[]) => {
  return cart.reduce((total: number, product: ProductInterface) => {
    return total + product.price * product.quantity;
  }, 0);
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let itemToAdd = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemToAdd.id
      );
      console.log("find INex", existingItemIndex);
      if (existingItemIndex === -1) {
        state.cart.push({ ...itemToAdd, quantity: 1 });
      } else {
        // state.cart[existingItemIndex].quantity++
        console.log("Already in Cart");
        ToastPopUp("error", "Item already added to cart");
      }
    },
    incrementQuantity: (state, action) => {
      let id = action.payload;

      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      console.log("find INex", existingItemIndex);

      if (existingItemIndex !== -1) {
        //  state.cart.push({...itemToAdd,quantity:1})
        state.cart[existingItemIndex].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      let id = action.payload;

      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      console.log("find INex", existingItemIndex);

      if (existingItemIndex !== -1) {
        //  state.cart.push({...itemToAdd,quantity:1})

        state.cart[existingItemIndex].quantity--;
      }
    },
    SetQuantityByInput: (state, action) => {
      let { id, quantity } = action.payload;

      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      console.log("find INex", existingItemIndex);

      if (existingItemIndex !== -1) {
        //  state.cart.push({...itemToAdd,quantity:1})

        state.cart[existingItemIndex].quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      let id = action.payload;

      state.cart = state.cart.filter((item) => item.id !== id);
      ToastPopUp("success", "Item Removed  successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});

export function ToastPopUp(action: string, message: string) {
  if (action === "error") {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (action === "success") {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  SetQuantityByInput,
} = ProductSlice.actions;
export default ProductSlice.reducer;
