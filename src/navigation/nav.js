import React from "react";
import TableComponent from "../components/common/TableComponent";
import mainDataSet from "../data/one_thirty_five_rows.json";
import Home from "../pages/auth-pages/home-page/Home";
import Login from "../pages/un-auth-pages/authentication-pages/Login";
import VisitingHomePage from "../pages/un-auth-pages/visiting-home/VisitingHomePage";

const dataSet = mainDataSet.slice(0, 10);

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
		element: (
			<TableComponent dataSet={dataSet} showFeatures={true} showHeader={true} />
		),
		isMenu: false,
		isAuthenticationNeeded: true,
	},
	{
		path: "/demo-logs",
		name: "Demo Logs",
		element: (
			<TableComponent dataSet={dataSet} showFeatures={true} showHeader={true} />
		),
		isMenu: true,
		isAuthenticationNeeded: true,
	},
	// {
	// 	path: "/about",
	// 	name: "About",
	// 	element: <About />,
	// 	isMenu: true,
	// 	isAuthenticationNeeded: true,
	// },
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
