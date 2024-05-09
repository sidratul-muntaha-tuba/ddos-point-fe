import React from "react";
import TableComponent from "../components/common/TableComponent";
import Home from "../pages/auth-pages/home-page/Home";
import About from "../pages/common-pages/about-page/About";
import Login from "../pages/un-auth-pages/authentication-pages/Login";
import VisitingHomePage from "../pages/un-auth-pages/visiting-home/VisitingHomePage";

export const navItems = [
	{
		path: "/",
		name: "Home",
		element: <Home />,
		isMenu: true,
		isAuthenticationNeeded: true,
	},
	{
		path: "/demo-logs-importants",
		name: "Demo Logs (Importants)",
		element: <TableComponent />,
		isMenu: false,
		isAuthenticationNeeded: true,
	},
	{
		path: "/demo-logs",
		name: "Demo Logs",
		element: <TableComponent />,
		isMenu: true,
		isAuthenticationNeeded: true,
	},
	{
		path: "/about",
		name: "About",
		element: <About />,
		isMenu: true,
		isAuthenticationNeeded: true,
	},
	{
		path: "/login",
		name: "Login",
		element: <Login />,
		isMenu: false,
		isAuthenticationNeeded: false,
	},
	{
		path: "/guest-home",
		name: "Guest Home",
		element: <VisitingHomePage />,
		isMenu: false,
		isAuthenticationNeeded: false,
	},
];
