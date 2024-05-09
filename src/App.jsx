import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";
import { clearCookie } from "./helpers/common";
import {
	loginTheUser,
	logoutTheUser,
} from "./redux/reducers/loggedInUser/loggedInUserSlice";
import { Toaster } from "./ui-components/ui//toaster";

const App = () => {
	const dispatch = useDispatch();

	const userMail = Cookies.get("userEmail");
	const userLoggedInVerified =
		Cookies.get("isUserLoggedIn") === "true" ? true : false;

	// useEffect(() => {
	// 	const callTheServerForTheFirstTime = async () => {
	// 		await axios.get(baseBeUrl + initialStartUrl);
	// 	};
	// 	callTheServerForTheFirstTime();
	// }, []);

	useEffect(() => {
		if (userMail && userLoggedInVerified) {
			dispatch(
				loginTheUser({
					email: userMail,
				})
			);
		} else {
			dispatch(logoutTheUser());
			clearCookie();
		}
	}, [userMail, userLoggedInVerified]);

	return (
		<div className="flex flex-col min-h-screen">
			<BrowserRouter>
				<AuthRoute />
				<Toaster />
			</BrowserRouter>
		</div>
	);
};

export default App;
