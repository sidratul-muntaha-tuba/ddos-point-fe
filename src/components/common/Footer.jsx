import React from "react";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-gray-800">
			<div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
				<div className="flex justify-center space-x-6 text-white font-bold">
					<p>
						<span className="text-red-600">DDoS-Point</span> - Copyright ©{" "}
						<span className="text-red-600">{currentYear}</span> All Rights
						Reserved !
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
