import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";
import AsyncStorage from "@react-native-async-storage/async-storage";

const productReducer = (state, action) => {
  switch (action.type) {
    case "fetch_products":
      return { ...state, prodcuts: [...action.payload] };
    case "add_to_cart":
      return { ...state, cart: [...state.cart, action.payload] };
    case "set_cart":
      return {
        ...state,
        cart: [...action.payload],
      };
    default:
      return state;
  }
};

const fetchProducts = (dispatch) => async () => {
  try {
    const res = await greenverseApi.get("/products");
    // console.log(res.data);
    const json = JSON.stringify(res.data);
    await AsyncStorage.setItem("products", json);
    dispatch({ type: "fetch_products", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

const addProduct =
  (dispatch) =>
  async ({ productName, productImg, quantity, category, price }, callback) => {
    try {
      const res = await greenverseApi.post("/product", {
        productName,
        productImg,
        quantity,
        category,
        price,
      });
      // dispatch({ type: "create_task", payload: res.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

const addToCart =
  (dispatch) =>
  async ({ product }) => {
    try {
      dispatch({ type: "add_to_cart", payload: product });
      // let cart = await AsyncStorage.getItem("cart");
      // cart = JSON.parse(cart);
      // if (cart && cart.length > 0) {
      //   cart = [cart, product];
      // } else {
      //   cart = [product];
      // }
      // await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  };

const setCartFromLocal =
  (dispatch) =>
  async ({ cart }) => {
    try {
      dispatch({ type: "set_cart", payload: cart });
    } catch (err) {
      console.log(err);
    }
  };

export const { Context, Provider } = createDataContext(
  productReducer,
  { fetchProducts, addProduct, addToCart, setCartFromLocal },
  { prodcuts: [], cart: [] }
);
