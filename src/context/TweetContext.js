import createDataContext from "./createDataContext";
import tweetApi from "../api/tweetApi";
const tweetReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tweet":
      return { ...state, tweet: action.payload };
    case "fetch_user":
      return { ...state, user: action.payload };
    case "add_name":
      return { ...state, newTweet: action.payload };
    case "reset":
      return { ...state, newTweet: "", refresh: false };
    default:
      return state;
  }
};
const fetchTweet = (dispatch) => async () => {
  const response = await tweetApi.get("/tweet");
  dispatch({ type: "fetch_tweet", payload: response.data });
};
const fetchUser = (dispatch) => async () => {
  const response = await tweetApi.get("/user");
  dispatch({ type: "fetch_user", payload: response.data });
};
const createTweet = (dispatch) => async (content) => {
  await tweetApi.post("/tweet", { content });
};
const addTweet = (dispatch) => (content) => {
  dispatch({ type: "add_name", payload: content });
};
const reset = (dispatch) => () => {
  dispatch({ type: "reset" });
};
const deleteTweet = (dispatch) => async (_id) => {
  await tweetApi.delete("/tweet", { data: { _id } });
  const response = await tweetApi.get("/tweet");
  dispatch({ type: "fetch_tweet", payload: response.data });
};
const likeTweet = (dispatch) => async (_id) => {
  const response = await tweetApi.post("/tweet/like", { _id });
  dispatch({ type: "fetch_tweet", payload: response.data });
};

export const { Context, Provider } = createDataContext(
  tweetReducer,
  {
    fetchTweet,
    fetchUser,
    createTweet,
    deleteTweet,
    addTweet,
    reset,
    likeTweet,
  },
  { tweet: [], user: {}, newTweet: ""}
);
