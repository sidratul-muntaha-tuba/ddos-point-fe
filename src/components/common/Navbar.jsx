import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import RepointIcon from "../../assets/icons/ddos.png";
import { clearCookie } from "../../helpers/common";
import { navItems } from "../../navigation/nav";
import { logoutTheUser } from "../../redux/reducers/loggedInUser/loggedInUserSlice";
import ThemeToggler from "./ThemeToggler";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	const navigation = navItems;
	const [selectedMenu, setSelectedMenu] = useState("Home");
	const dispatch = useDispatch();
	const location = useLocation();

	const getSelectedMenu = () => {
		const pathName = location.pathname;
		const menuItem = navItems.find((item) => item.path === pathName);
		return menuItem ? menuItem.name : "Home";
	};

	useEffect(() => {
		setSelectedMenu(getSelectedMenu());
	}, [currentUser, location.pathname]);

	const MenuItemInHorizontal = ({ route }) => {
		return (
			<Link
				to={route.path}
				onClick={() => {
					setSelectedMenu(route.name);
				}}>
				<div
					className={classNames(
						route.name === selectedMenu
							? "bg-gray-900 text-white"
							: "text-gray-300 hover:bg-gray-700 hover:text-white",
						"rounded-md px-3 py-2 text-sm font-medium"
					)}>
					{route.name}
				</div>
			</Link>
		);
	};

	return (
		<div className="sticky top-0 z-50">
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }) => {
					return (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
								<div className="relative flex h-16 items-center justify-between">
									<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
										<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<Bars3Icon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
									<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
										<div className="flex flex-shrink-0 items-center">
											<Link
												to="/"
												onClick={() => {
													setSelectedMenu("Home");
												}}>
												<img
													className="h-10 w-auto"
													src={RepointIcon}
													alt="Repoint"
												/>
											</Link>
										</div>
										<div className="hidden sm:ml-6 sm:block">
											<div className="flex space-x-4">
												{navigation.map((route, index) => {
													if (!route.isAuthenticationNeeded && route.isMenu) {
														return (
															<MenuItemInHorizontal key={index} route={route} />
														);
													} else if (currentUser.isLoggedIn && route.isMenu) {
														return (
															<MenuItemInHorizontal key={index} route={route} />
														);
													} else return false;
												})}
											</div>
										</div>
									</div>

									<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
										{" "}
										<Menu as="div" className="relative ml-3 m-auto">
											<ThemeToggler />
										</Menu>
									</div>

									<div className="hidden sm:block">
										{currentUser.isLoggedIn ? (
											<div>
												<Link
													to={"/"}
													onClick={() => {
														dispatch(logoutTheUser());
														clearCookie();
													}}
													className="rounded-md px-3 py-2 ml-6 text-sm text-white font-bold">
													Log out
												</Link>
											</div>
										) : (
											<div>
												<Link
													to={"login"}
													onClick={() => {
														setSelectedMenu("Login");
													}}
													className="rounded-md px-3 py-2 ml-6 text-sm text-white font-bold">
													Log in
												</Link>
											</div>
										)}
									</div>
								</div>
							</div>

							<Disclosure.Panel className="sm:hidden">
								<div className="space-y-1 px-2 pb-3 pt-2">
									{navigation.map((route, index) => {
										if (!route.isPrivate && route.isMenu) {
											return (
												<Link
													key={route.name}
													to={route.path}
													onClick={() => {
														setSelectedMenu(route.name);
													}}
													className={classNames(
														route.name === selectedMenu
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"block rounded-md px-3 py-2 text-base font-medium"
													)}>
													{route.name}
												</Link>
											);
										} else if (currentUser.isLoggedIn && route.isMenu) {
											return (
												<Link
													key={route.name}
													to={route.path}
													onClick={() => {
														setSelectedMenu(route.name);
													}}
													className={classNames(
														route.name === selectedMenu
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"block rounded-md px-3 py-2 text-base font-medium"
													)}>
													{route.name}
												</Link>
											);
										} else return false;
									})}
									{currentUser.isLoggedIn ? (
										<Link
											to={"/"}
											onClick={() => {
												dispatch(logoutTheUser());
												clearCookie();
											}}
											className={classNames(
												"text-gray-300 hover:bg-gray-700 hover:text-white",
												"block rounded-md px-3 py-2 text-base font-medium"
											)}>
											Log out
										</Link>
									) : (
										<Link
											to={"login"}
											onClick={() => {
												setSelectedMenu("Login");
											}}
											className={classNames(
												"Login" === selectedMenu
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"block rounded-md px-3 py-2 text-base font-medium"
											)}>
											Log in
										</Link>
									)}
								</div>
							</Disclosure.Panel>
						</>
					);
				}}
			</Disclosure>
		</div>
	);
};

export default Navbar;
