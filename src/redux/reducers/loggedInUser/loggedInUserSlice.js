import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	isLoggedIn: false,
};

export const loggedInUserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginTheUser: (state, action) => {
			state.email = action.payload.email;
			state.isLoggedIn = action.payload.email ? true : false;
		},
		logoutTheUser: (state) => {
			state.email = "";
			state.isLoggedIn = false;
		},
	},
});

export const { loginTheUser, logoutTheUser } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
