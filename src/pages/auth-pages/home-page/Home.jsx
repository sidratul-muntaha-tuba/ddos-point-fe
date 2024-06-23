import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/solid";
import { Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../../../components/common/TableComponent";
import { onlyImportantKeySet } from "../../../constants/common";
import mainDataSet from "../../../data/one_thirty_five_rows.json";
import { postDataToBe } from "../../../helpers/common";
import { Button } from "../../../ui-components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../ui-components/ui/card";
import { Label } from "../../../ui-components/ui/label";
import { Skeleton } from "../../../ui-components/ui/skeleton";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../ui-components/ui/tabs";
import { baseBeUrl, predictionUrl } from "../../../urls/url";

const Home = () => {
	const currentUser = useSelector((state) => state.loggedInUser || null);
	let navigate = useNavigate();

	useEffect(() => {
		if (!currentUser.isLoggedIn) {
			navigate("/guest-home");
		}
	}, [currentUser]);

	const [file, setFile] = useState(null);
	const [hasRequestSent, setHasRequestSent] = useState(false);
	const [isAllColumnsSelected, setIsAllColumnsSelected] = useState(false);
	const [mainData, setMainData] = useState([]);
	const getRandomTenDataFromDataSet = () => {
		const randomData = mainDataSet.sort(() => Math.random() - 0.5).slice(0, 10);
		return randomData;
	};

	const getRandomTwentyDataFromCsv = () => {
		setMainData(getRandomTenDataFromDataSet());
	};

	const clearMainData = () => {
		handleRemoveFile();
		setMainData([]);
	};

	const handleFileChange = (e) => {
		setMainData([]);
		const uploadedFile = e.target.files[0];
		setFile(uploadedFile);
		const fileReader = new FileReader();
		fileReader.readAsText(uploadedFile);
		fileReader.onload = (e) => {
			const csv = e.target.result;
			const lines = csv.split("\n");
			const headers = lines[0].split(",");
			const data = [];
			for (let i = 1; i < lines.length; i++) {
				const currentLine = lines[i].split(",");
				if (currentLine.length === headers.length) {
					let obj = {};
					for (let j = 0; j < headers.length; j++) {
						obj[headers[j]] = currentLine[j];
					}
					data.push(obj);
				}
			}
			if (data && data.length) {
				setMainData(data);
			}
		};
	};

	const handleRemoveFile = () => {
		setFile(null);
		setMainData([]);
	};

	const getResultFromBe = async (data) => {
		setHasRequestSent(true);
		const response = await postDataToBe(baseBeUrl + predictionUrl, data);
		if (response) {
			const newMainData = mainData.map((item, i) => {
				const newItem = {
					prediction: response[i].general,
					attackType: response[i].specific,
					...item,
				};
				return newItem;
			});
			if (newMainData && newMainData.length) {
				setMainData(newMainData);
			}
			setHasRequestSent(false);
		}
	};

	return (
		<div className="h-full w-full">
			<Tabs
				defaultValue="own-log-file"
				onValueChange={(value) => {
					if (value === "own-log-file") {
						clearMainData();
					} else {
						getRandomTwentyDataFromCsv();
					}
				}}
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
						<CardContent>
							{hasRequestSent ? (
								<div className="flex flex-col space-y-3 ml-auto mr-auto">
									<Skeleton className="h-[180px] w-[60%] rounded-xl" />
									<div className="space-y-2 w-full">
										<Skeleton className="h-4 w-[60%]" />
										<Skeleton className="h-4 w-[50%]" />
									</div>
								</div>
							) : (
								<TableComponent
									dataSet={mainData}
									showFeatures={false}
									showHeader={true}
								/>
							)}
						</CardContent>
						<CardFooter>
							{mainData && mainData.length > 0 ? (
								<>
									{!mainData[0]["prediction"] ? (
										<Button
											onClick={() => {
												getResultFromBe(mainData);
											}}>
											Analyze Log
										</Button>
									) : (
										<Button
											onClick={() => {
												clearMainData();
											}}>
											Reset
										</Button>
									)}
								</>
							) : (
								<Button disabled>
									{" "}
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Waiting
									For Log
								</Button>
							)}
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
									in the{" "}
									<Link
										className="underline text-indigo-500 font-bold"
										target="_blank"
										to={"https://www.unb.ca/cic/datasets/ddos-2019.html"}>
										CIC-DoS Dataset
									</Link>{" "}
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
									{onlyImportantKeySet.length} Important Features
								</Label>
								{/* <Switch
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
								</Label> */}
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
												onClick={() => {
													handleRemoveFile();
												}}
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
							{hasRequestSent ? (
								<div className="flex flex-col space-y-3 ml-auto mr-auto">
									<Skeleton className="h-[180px] w-[60%] rounded-xl" />
									<div className="space-y-2 w-full">
										<Skeleton className="h-4 w-[60%]" />
										<Skeleton className="h-4 w-[50%]" />
									</div>
								</div>
							) : (
								<TableComponent
									dataSet={mainData}
									showFeatures={false}
									showHeader={false}
								/>
							)}
						</CardContent>
						<CardFooter>
							{file &&
							file?.name &&
							file?.size > 0 &&
							mainData &&
							mainData.length > 0 ? (
								<>
									{!mainData[0]["prediction"] ? (
										<Button
											onClick={() => {
												getResultFromBe(mainData);
											}}>
											Analyze Log
										</Button>
									) : (
										<Button
											onClick={() => {
												clearMainData();
											}}>
											Reset
										</Button>
									)}
								</>
							) : (
								<Button disabled>
									{" "}
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Waiting
									For Log
								</Button>
							)}
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Home;
