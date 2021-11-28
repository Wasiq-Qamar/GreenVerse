import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const orderReducer = (state, action) => {
  switch (action.type) {
    // case "create_task":
    //   return { ...state, tasks: [...state.tasks, action.payload] };
    case "fetch_orders":
      return { orders: [...action.payload] };
    default:
      return state;
  }
};

const fetchOrders =
  (dispatch) =>
  async ({ userId }) => {
    try {
      const res = await greenverseApi.get(`/user/orders/${userId}`);
      dispatch({ type: "fetch_orders", payload: res.data });
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const placeOrder =
  (dispatch) =>
  async (
    {
      userId,
      productId,
      method,
      amount,
      cardNumber,
      address,
      zipcode,
      city,
      contact,
    },
    callback
  ) => {
    try {
      const res = await greenverseApi.post("/order", {
        userId,
        productId,
        method,
        amount,
        cardNumber,
        address,
        zipcode,
        city,
        contact,
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
  orderReducer,
  { fetchOrders, placeOrder },
  { orders: [] }
);
