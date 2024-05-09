import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { navItems } from "../../navigation/nav";
import PageNotFound from "../../pages/common-pages/error-pages/PageNotFound";

const RenderRoutes = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	const navigation = navItems;
	return (
		<Routes>
			{navigation.map((route, index) => {
				if (route.isPrivate && currentUser.isLoggedIn) {
					return (
						<Route key={index} path={route.path} element={route.element} />
					);
				} else if (!route.isPrivate) {
					return (
						<Route key={index} path={route.path} element={route.element} />
					);
				} else {
					return null;
				}
			})}
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default RenderRoutes;
