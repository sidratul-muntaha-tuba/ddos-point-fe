import axios from "axios";
import Cookies from "js-cookie";

export const getResponseFromBe = async (url) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(
			"While making fetch call to ",
			url,
			" faced the issue: ",
			error
		);
		return null;
	}
};

export const postDataToBe = async (url, data) => {
	try {
		const response = await axios.post(url, {
			data,
		});
		return response.data;
	} catch (error) {
		console.log(
			"While making POST request to ",
			url,
			" faced the issue: ",
			error
		);
		return error.response.data;
	}
};

export const clearCookie = () => {
	Cookies.remove("userEmail");
	Cookies.remove("isUserLoggedIn");
	Cookies.remove("userAuthExpirationTime");
};

export const setCookie = (email, nextExpirationInDays) => {
	Cookies.set("userEmail", email, { expires: nextExpirationInDays });
	Cookies.set("isUserLoggedIn", email ? "true" : "false", {
		expires: nextExpirationInDays,
	});
};