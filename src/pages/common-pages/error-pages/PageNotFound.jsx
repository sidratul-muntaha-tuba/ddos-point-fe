import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundIcon from "../../../assets/icons/page-not-found.svg";

const PageNotFound = () => {
	return (
		<main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-800">
			<img src={PageNotFoundIcon} alt="" className="h-80 animate-pulse" />
			<div className="text-center">
				<h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-8 text-base leading-7 text-gray-600">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-16 flex items-center justify-center gap-x-6">
					<Link
						to="/"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Go back home
					</Link>
					<Link
						to="#"
						className="text-sm font-semibold text-gray-900 dark:text-gray-300">
						Contact support <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default PageNotFound;
