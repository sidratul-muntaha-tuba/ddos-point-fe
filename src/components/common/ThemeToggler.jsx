import React, { useEffect, useState } from "react";
import DarkThemeIcon from "../../assets/icons/dark-mode.png";
import LightThemeIcon from "../../assets/icons/light-mode.png";

const ThemeToggler = () => {
	const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

	const [theme, setTheme] = useState("");

	const setThemeInitially = () => {
		const themeStoredInLocalStorage = localStorage.getItem("theme");
		if (themeStoredInLocalStorage) {
			setTheme(themeStoredInLocalStorage);
		} else {
			const systemTheme = darkThemeMq.matches ? "dark" : "light";
			setTheme(systemTheme);
			localStorage.setItem("theme", systemTheme);
		}
	};

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else if (theme === "light") {
			document.documentElement.classList.remove("dark");
		} else {
			setThemeInitially();
		}
	}, [theme]);

	const handleThemeToggler = () => {
		const themeToSet = theme === "light" ? "dark" : "light";
		setTheme(themeToSet);
		localStorage.setItem("theme", themeToSet);
	};
	return (
		<div className="h-9 w-9 rounded-full m-auto">
			<button
				onClick={() => {
					handleThemeToggler();
				}}
				className="dark:text-white text-violet-600">
				{theme === "dark" ? (
					<img src={DarkThemeIcon} alt="Dark Mode" />
				) : (
					<img src={LightThemeIcon} alt="Light Mode" />
				)}
			</button>
		</div>
	);
};

export default ThemeToggler;
