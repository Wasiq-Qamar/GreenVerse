import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_is_loading":
      return { ...state, isLoading: false };
    case "signin":
      return { errorMessage: "", token: action.payload, isLoading: false };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "", isLoading: false };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const clearIsLoading = (dispatch) => {
  return () => {
    dispatch({ type: "clear_is_loading" });
  };
};

const tryLocalSignin = (dispatch) => {
  return ({ token }) => {
    dispatch({ type: "signin", payload: token });
  };
};

const signup = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const res = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data.token });

      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with signup.",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const res = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      dispatch({ type: "signin", payload: res.data.token });

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Unable to signin.",
      });
    }
  };
};

const signout = (dispatch) => {
  return () => {
    AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignin,
    clearIsLoading,
  },
  { token: null, errorMessage: "", isLoading: true }
);
