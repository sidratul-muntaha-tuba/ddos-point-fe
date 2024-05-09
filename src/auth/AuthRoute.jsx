import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import RenderRoutes from "../components/common/RenderRoutes";

const AuthRoute = () => {
	return (
		<>
			<Navbar />
			<div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
				<RenderRoutes />
			</div>
			<Footer />
		</>
	);
};

export default AuthRoute;
