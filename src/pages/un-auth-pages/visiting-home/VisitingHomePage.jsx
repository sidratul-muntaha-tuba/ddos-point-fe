import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VisitingHomePage = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	let navigate = useNavigate();

	useEffect(() => {
		if (currentUser.isLoggedIn) {
			navigate("/");
		}
	}, [currentUser]);

	return <div>VisitingHomePage</div>;
};

export default VisitingHomePage;
