import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "./reducers/loggedInUser/loggedInUserSlice";

export const store = configureStore({
	reducer: {
		loggedInUser: loggedInUserReducer,
	},
});
