import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import guestAnimation from "../../../assets/animations/guest.json";
import { Button } from "../../../ui-components/ui/button";
import { Label } from "../../../ui-components/ui/label";

const VisitingHomePage = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	let navigate = useNavigate();

	useEffect(() => {
		if (currentUser.isLoggedIn) {
			navigate("/");
		}
	}, [currentUser]);

	return (
		<div className="text-center">
			<Lottie
				className="aspect-auto h-[50vh]"
				animationData={guestAnimation}
				loop={true}
			/>
			<Label className="font-bold text-xl text-center">
				Get a DDoS Check on your System Logs Now...
			</Label>
			<br />
			<br />
			<Link to="/login">
				<Button className="text-xl p-4 w-40 font-extrabold">Login</Button>
			</Link>
		</div>
	);
};

export default VisitingHomePage;
