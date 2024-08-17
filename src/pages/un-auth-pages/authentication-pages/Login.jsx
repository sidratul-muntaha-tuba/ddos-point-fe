import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCookie, setCookie } from "../../../helpers/common";
import {
	loginTheUser,
	logoutTheUser,
} from "../../../redux/reducers/loggedInUser/loggedInUserSlice";
import { Button } from "../../../ui-components/ui/button";
import { Input } from "../../../ui-components/ui/input";
import { Label } from "../../../ui-components/ui/label";
import { useToast } from "../../../ui-components/ui/use-toast";

const Login = () => {
	let navigate = useNavigate();
	const { toast } = useToast();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const login = async () => {
		if (email && password) {
			try {
				const masterLoginCreds = process.env.REACT_APP_MASTER_LOGIN_CREDS;
				if (email === masterLoginCreds && password === masterLoginCreds) {
					toast({
						title: "Login Successful",
						description: "You can now access the DDoS Point",
					});
					dispatch(loginTheUser({ email: email }));
					setCookie(email, 1);
					navigate("/");
				} else {
					toast({
						title: "Login Failed",
						description: "Invalid credentials",
						variant: "destructive",
					});
					dispatch(logoutTheUser());
					clearCookie();
				}
			} catch (error) {
				toast({
					title: "Login Failed",
					description: "There were some issues while user tried to login",
					variant: "destructive",
				});
				dispatch(logoutTheUser());
				clearCookie();
			}
		}
	};

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter master credentials to login
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<span className="mt-2 text-sm text-gray-400">Public Access Granted! Use <strong>admin</strong> for both email and password...</span>
						<Button
							onClick={() => {
								login();
							}}
							type="submit"
							className="w-full">
							Login
						</Button>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<img
					className="h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
					src="https://cdn.metatime.com/landing/blog/1686575019blobid1.jpg"
					alt="DDoS Point"
				/>
			</div>
		</div>
	);
};

export default Login;
