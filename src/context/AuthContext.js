import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_is_loading":
      return { ...state, isLoading: false };
    case "signin":
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
        email: action.payload.email,
        password: action.payload.password,
        userName: action.payload.userName,
        imageUri: action.payload.imageUri,
        userId: action.payload.userId,
        contact: action.payload.contact,
        userType: action.payload.userType,
        isLoading: false,
      };
    case "image_upload":
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        imageUri: action.payload,
      };
    case "edit_profile":
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        contact: action.payload.contact,
        email: action.payload.email,
        userName: action.payload.userName,
      };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { ...state, token: null, errorMessage: "", isLoading: false };
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
  return async () => {
    dispatch({ type: "clear_is_loading" });
  };
};

const tryLocalSignin = (dispatch) => {
  return async ({ token }) => {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    const imageUri = await AsyncStorage.getItem("imageUri");
    const userName = await AsyncStorage.getItem("userName");
    const userId = await AsyncStorage.getItem("userId");
    const contact = await AsyncStorage.getItem("contact");
    const userType = await AsyncStorage.getItem("userType");

    const data = {
      token,
      email,
      password,
      userName,
      imageUri,
      userId,
      contact,
      userType,
    };
    dispatch({ type: "signin", payload: data });
  };
};

const signup = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const res = await greenverseApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("userName", res.data.userName);
      await AsyncStorage.setItem("email", res.data.email);
      await AsyncStorage.setItem("password", res.data.password);
      await AsyncStorage.setItem("imageUri", res.data.imageUri);
      await AsyncStorage.setItem("userId", res.data.userId);
      await AsyncStorage.setItem("contact", res.data.contact);
      await AsyncStorage.setItem("userType", res.data.userType);
      dispatch({ type: "signin", payload: res.data });

      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }, callback) => {
    try {
      const res = await greenverseApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("userName", res.data.userName);
      await AsyncStorage.setItem("email", res.data.email);
      await AsyncStorage.setItem("password", res.data.password);
      await AsyncStorage.setItem("imageUri", res.data.imageUri);
      await AsyncStorage.setItem("userId", res.data.userId);
      await AsyncStorage.setItem("contact", res.data.contact);
      await AsyncStorage.setItem("userType", res.data.userType);
      dispatch({ type: "signin", payload: res.data });

      if (callback) {
        callback();
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Invalid Email or Password",
      });
    }
  };
};

const uploadImage = (dispatch) => {
  return async (image, userId) => {
    let id = userId;
    try {
      const res = await greenverseApi.patch(`/user/uploadImage/${id}`, {
        image: image,
      });
      await AsyncStorage.setItem("imageUri", res.data.image);
      dispatch({ type: "image_upload", payload: res.data.image });
    } catch (err) {
      console.log("Upload " + err);
    }
  };
};

const updateInfo = (dispatch) => {
  return async (userName, email, contact, userId) => {
    let id = userId;
    try {
      const res = await greenverseApi.patch(`/user/${id}`, {
        userName,
        email,
        contact,
      });
      if (userName) {
        await AsyncStorage.setItem("userName", res.data.userName);
      }
      await AsyncStorage.setItem("contact", res.data.contact);
      if (contact) {
        await AsyncStorage.setItem("email", res.data.email);
      }
      dispatch({ type: "edit_profile", payload: res.data });
      console.log(res.data);
    } catch (err) {
      console.log("Upload " + err);
      dispatch({
        type: "add_error",
        payload: err.response.data.error,
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
    uploadImage,
    updateInfo,
  },
  {
    token: null,
    name: "",
    password: "",
    imageUri: "",
    userName: "",
    userId: null,
    contact: "",
    errorMessage: "",
    userType: "",
    isLoading: true,
    email: "",
  }
);
