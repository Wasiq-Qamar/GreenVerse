import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const productReducer = (state, action) => {
  switch (action.type) {
    // case "create_task":
    //   return { ...state, tasks: [...state.tasks, action.payload] };
    case "fetch_products":
      return { prodcuts: [...action.payload] };
    default:
      return state;
  }
};

const fetchProducts = (dispatch) => async () => {
  try {
    const res = await greenverseApi.get("products");
    dispatch({ type: "fetch_products", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

const addProduct =
  (dispatch) =>
  async ({ productName, productImg, quantity, category }, callback) => {
    try {
      const res = await greenverseApi.post("/product", {
        productName,
        productImg,
        quantity,
        category,
      });
      // dispatch({ type: "create_task", payload: res.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

export const { Context, Provider } = createDataContext(
  productReducer,
  { fetchProducts, addProduct },
  { prodcuts: [] }
);
