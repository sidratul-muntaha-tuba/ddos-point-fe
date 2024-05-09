import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/solid";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui-components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../ui-components/ui/card";
import { Input } from "../../../ui-components/ui/input";
import { Label } from "../../../ui-components/ui/label";
import { Switch } from "../../../ui-components/ui/switch";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../ui-components/ui/tabs";

const Home = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	let navigate = useNavigate();

	useEffect(() => {
		if (!currentUser.isLoggedIn) {
			navigate("/guest-home");
		}
	}, [currentUser]);

	const [file, setFile] = useState(null);
	const [isAllColumnsSelected, setIsAllColumnsSelected] = useState(false);

	const handleFileChange = (e) => {
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
	};

	const handleRemoveFile = () => {
		setFile(null);
	};

	return (
		<div className="h-full w-full">
			<Tabs
				defaultValue="own-log-file"
				className="max-w-sm sm:max-w-[90%] mx-auto">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="own-log-file">Personal Log</TabsTrigger>
					<TabsTrigger value="default-log-file">Default Log</TabsTrigger>
				</TabsList>
				<TabsContent value="default-log-file">
					<Card>
						<CardHeader>
							<CardTitle>Test</CardTitle>
							<CardDescription>
								This option will show you how the prediction is done using a
								by-default log file where you an still do some tweaks...
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input id="name" defaultValue="Pedro Duarte" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Username</Label>
								<Input id="username" defaultValue="@peduarte" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="own-log-file">
					<Card>
						<CardHeader>
							<CardTitle>Analyze Your System</CardTitle>
							<CardDescription>
								Check your system logs to keep safe from DDoS...
							</CardDescription>
							<CardDescription>
								<span className="animate-pulse">
									But at first please have a look at the{" "}
									<span>
										<Link
											to={
												isAllColumnsSelected
													? "/demo-logs"
													: "/demo-logs-importants"
											}
											className="animate-none text-red-500 font-bold underline cursor-pointer">
											Demo Logs
										</Link>
									</span>{" "}
									format please{" "}
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center space-x-4">
								<Label
									className={`${
										isAllColumnsSelected ? "" : "text-red-300 font-bold"
									}`}
									htmlFor="general-mode">
									35 Important Features
								</Label>
								<Switch
									// value={isAllColumnsSelected}
									onCheckedChange={(e) => {
										setIsAllColumnsSelected(e);
									}}
									id="airplane-mode"
								/>
								<Label
									htmlFor="specific-mode"
									className={`${
										isAllColumnsSelected ? "text-red-300 font-bold" : ""
									}`}>
									All Features
								</Label>
							</div>
							<div className="w-full">
								<Label
									htmlFor="current"
									className="flex space-between items-center">
									{file ? (
										<div className="flex items-center">
											<span>{file.name}</span>
											<Cross2Icon
												className="ml-2 h-5 text-red-500 cursor-pointer border-2 border-red-400 rounded-full w-5 p-[1/2]"
												onClick={handleRemoveFile}
											/>
										</div>
									) : (
										<Label className="flex space-between items-center">
											<Label>
												Upload Log{" "}
												<Label className="mr-1 text-red-500">csv*</Label>
											</Label>
											<ArrowUpOnSquareStackIcon
												id="log-upload"
												className="ml-2 h-6 animate-pulse cursor-pointer"
											/>
											<input
												htmlFor="log-upload"
												accept=".csv"
												type="file"
												className="hidden"
												onChange={(e) => {
													handleFileChange(e);
												}}
											/>
										</Label>
									)}
								</Label>
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save password</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Home;
