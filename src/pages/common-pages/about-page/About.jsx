import React from "react";

const About = () => {
	return (
		<div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen flex items-center justify-center rounded">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<p className="text-justify mb-4 font-bold">
					This is the companion tool that will assist the cyber-security experts
					in predicting DDoS Attacks within the system log files...
				</p>
				<div className="bg-indigo-100 p-4 rounded-md">
					<p className="text-indigo-800 font-bold">Thesis Project by</p>
					<p className="text-indigo-600">Sidratul Muntaha Tuba</p>
					<p className="text-indigo-600">201-15-13585</p>
					<p className="text-indigo-600">CSE-55, DIU</p>
				</div>
			</div>
		</div>
	);
};

export default About;
