import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fullKeySet, onlyImportantKeySet } from "../../constants/common";
import { Label } from "../../ui-components/ui/label";
import { Separator } from "../../ui-components/ui/separator";
import { Switch } from "../../ui-components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui-components/ui/table";

const TableComponent = (props) => {
	let dataSet = [];
	let showFeatures = true;
	let showHeader = true;
	if (props && props.dataSet && props.dataSet.length > 0) {
		dataSet = props.dataSet;
	}
	if (props && (props.showFeatures || !props.showFeatures)) {
		showFeatures = props.showFeatures;
	}
	if (props && (props.showHeader || !props.showHeader)) {
		showHeader = props.showHeader;
	}
	const location = useLocation();
	const [allKeyNamesOfDataset, setAllKeyNamesOfDataset] = useState(
		location.pathname === "/demo-logs" ? fullKeySet : onlyImportantKeySet
	);
	const [isAllColumnsSelected, setIsAllColumnsSelected] = useState(
		location.pathname === "/demo-logs"
	);

	useEffect(() => {
		setAllKeyNamesOfDataset(
			isAllColumnsSelected ? fullKeySet : onlyImportantKeySet
		);
	}, [isAllColumnsSelected, location.pathname]);

	return (
		<>
			{showHeader && (
				<>
					<Label className="text-md font-bold mb-2">
						This is a log section. Here you can see the feature sets being used
						when considered{" "}
						<span className="text-red-500">
							{isAllColumnsSelected
								? "All"
								: `${onlyImportantKeySet.length} Important`}{" "}
							Features
						</span>
					</Label>
					<div className="flex items-center space-x-2 my-4">
						{location.pathname === "/demo-logs" ? (
							<>
								<Label
									htmlFor="specific-mode"
									className={`${
										isAllColumnsSelected ? "text-red-300 font-bold" : ""
									}`}>
									All Features
								</Label>
								<Switch
									onCheckedChange={(e) => setIsAllColumnsSelected(!e)}
									id="airplane-mode"
								/>
								<Label
									className={`${
										isAllColumnsSelected ? "" : "text-red-300 font-bold"
									}`}
									htmlFor="general-mode">
									{onlyImportantKeySet.length} Important Features
								</Label>
							</>
						) : (
							<>
								<Label
									className={`${
										isAllColumnsSelected ? "" : "text-red-300 font-bold"
									}`}
									htmlFor="general-mode">
									{onlyImportantKeySet.length} Important Features
								</Label>
								<Switch
									onCheckedChange={(e) => setIsAllColumnsSelected(e)}
									id="airplane-mode"
								/>
								<Label
									htmlFor="specific-mode"
									className={`${
										isAllColumnsSelected ? "text-red-300 font-bold" : ""
									}`}>
									All Features
								</Label>
							</>
						)}
					</div>
				</>
			)}
			{dataSet && dataSet.length > 0 && (
				<Table className="mt-2 h-[30vh] overflow-y-auto">
					<TableHeader>
						<TableRow>
							<TableHead>Serial No.</TableHead>
							{dataSet[0]["prediction"] && (
								<TableHead className="min-w-[100px] text-red-500 font-extrabold">
									Prediction
								</TableHead>
							)}
							{dataSet[0]["attackType"] && (
								<TableHead className="min-w-[100px] text-red-500 font-extrabold">
									Attack Type
								</TableHead>
							)}
							{allKeyNamesOfDataset.map((keyName, i) => (
								<TableHead
									className={`min-w-[100px] ${
										(keyName === "Label" || keyName === "Class") &&
										"text-red-500"
									}`}
									key={`data_${i}`}>
									{keyName}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{dataSet.map((data, i) => (
							<TableRow
								key={`row${i}`}
								className={`${
									data["prediction"] && data["prediction"] === "Attack"
										? "bg-red-300 dark:bg-red-900"
										: data["prediction"] && data["prediction"] !== ""
										? "bg-green-300 dark:bg-green-900"
										: ""
								}`}>
								<TableCell>{i + 1}</TableCell>
								{data["prediction"] && (
									<TableCell
										className={`min-w-[100px] ${
											data["prediction"] === "Attack" &&
											"text-red-700 dark:text-red-300"
										} ${
											data["prediction"] === "Benign" &&
											"text-green-700 dark:text-green-300"
										} font-extrabold`}>
										{data["prediction"] === "Attack" ? "DDoS" : "Benign"}
									</TableCell>
								)}
								{data["attackType"] && (
									<TableCell
										className={`min-w-[100px] ${
											data["prediction"] === "Attack" &&
											"text-red-700 dark:text-red-300"
										} ${
											data["prediction"] && "text-green-700 dark:text-green-300"
										} font-extrabold`}>
										{data["attackType"]}
									</TableCell>
								)}
								{allKeyNamesOfDataset.map((keyName, j) => (
									<TableCell
										className={`min-w-[100px] ${
											(keyName === "Label" || keyName === "Class") &&
											"text-red-500"
										}`}
										key={`cell${j}`}>
										{data[keyName]}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{showFeatures && (
				<div className="mt-10">
					<div className="space-y-1">
						<h4 className="font-medium leading-none font-extrabold text-indigo-500">
							Features at a glance
						</h4>
						<p className="text-muted-foreground">
							Only the feature list if you want to focus more deeply
						</p>
					</div>
					<Separator className="my-4 w-full" />
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
						{allKeyNamesOfDataset.map((item, index) => (
							<div
								className={`font-bold ${
									(item === "Label" || item === "Class") && "text-red-500"
								}`}
								key={index}>
								{item}
							</div>
						))}
					</div>
					<Separator className="my-4 w-full" />
					<Label className="text-red-500">
						red marked ones are the target features so no need them to be
						present in the log file
					</Label>
					<Separator className="my-4 w-full" />
				</div>
			)}
		</>
	);
};

export default TableComponent;
