import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const donationReducer = (state, action) => {
  switch (action.type) {
    case "add_donation":
      return { ...state, donations: [...state.donations, action.payload] };
    case "fetch_donations":
      return { donations: [...action.payload] };
    default:
      return state;
  }
};

const fetchDonations =
  (dispatch) =>
  async ({ userId }) => {
    console.log(userId);
    try {
      const res = await greenverseApi.get("/user/donations");
      let donations = res.data.filter((item) => item.userId === userId);
      dispatch({ type: "fetch_donations", payload: donations });
      console.log("Donations: ", donations);
    } catch (err) {
      console.log(err);
    }
  };

const addDonation =
  (dispatch) =>
  async (
    { userId, organization, method, amount, cardNumber, anonymous },
    callback
  ) => {
    try {
      const res = await greenverseApi.post("/donation", {
        userId,
        organization,
        method,
        amount,
        cardNumber,
        anonymous,
      });
      dispatch({ type: "add_donation", payload: res.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

export const { Context, Provider } = createDataContext(
  donationReducer,
  { fetchDonations, addDonation },
  { donations: [] }
);
