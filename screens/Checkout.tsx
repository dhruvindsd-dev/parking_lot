import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { S2, S3 } from "../components/Spacing/spacing";
import { GlobalStateContext, LotType } from "../context/GlobalState";
import diffHours from "../utils/diffHours";

export default function Checkout({
	navigation,
	route,
}: NativeStackScreenProps<any>) {
	const { setData, data } = useContext(GlobalStateContext);
	const [checkOutBtnText, setCheckOutBtnText] = useState<
		"CHECKOUT" | "Loading ..." | "PAYMENT SUCCESS"
	>("CHECKOUT");
	const lot: LotType = React.useMemo<LotType>(
		() => data.find((item) => item.lotNum === route.params.lotNum) as LotType,
		[]
	);

	const diff = diffHours(new Date(), lot.startTime as Date);
	let price = 0;
	if (diff <= 2) price = diff * 5;
	else {
		// greater than 2
		price += 10;
		price += (diff - 2) * 10;
	}

	const handleDeallocation = () => {
		const updatedData = [...data];
		const lotIns = updatedData.find((i) => +i.lotNum === +lot.lotNum);
		lotIns!.carRegistrationNum = undefined;
		lotIns!.startTime = undefined;
		setData({ data: updatedData });
		navigation.goBack();
	};

	const handleCheckout = () => {
		if (checkOutBtnText !== "CHECKOUT") return;
		setCheckOutBtnText("Loading ...");
		axios
			.post("https://httpstat.us/200", {
				"car-registration": lot.carRegistrationNum,
				charge: price,
			})
			.then((res) => {
				console.log(res);
				setCheckOutBtnText("PAYMENT SUCCESS");
			})
			.catch((res) => {
				console.log(res);
			});
	};

	return (
		<Layout style={{ flex: 1, justifyContent: "space-between" }}>
			<Layout style={{ flex: 1, alignItems: "center" }}>
				<Image
					style={{ width: "100%", height: "100%" }}
					source={require("../assets/images/enter-details-cover.png")}
				/>
			</Layout>
			<Layout style={styles.formWrapper}>
				<Text style={styles.title}>
					Checkout for car no : {lot?.carRegistrationNum as string}
				</Text>
				<S3 />
				<View style={styles.timeContainer}>
					<Text>From {format(lot.startTime as Date, "h:mm a")}</Text>
					<Text>------</Text>
					<Text>to {format(new Date(), "h:mm a")}</Text>
				</View>

				<S2 />
				<Divider />
				<S2 />

				<View style={styles.timeContainer}>
					<Text>
						Billed for <Text testID="deregister-time-spent">{diff}</Text> hour
					</Text>
					<Text testID="deregister-charge" style={{ fontWeight: "bold" }}>
						${price}
					</Text>
				</View>

				<S3 />
				<Button
					status={checkOutBtnText === "PAYMENT SUCCESS" ? "success" : undefined}
					testID="deregister-payment-button"
					onPress={handleCheckout}>
					{checkOutBtnText}
				</Button>
				<S2 />
				<Button
					appearance="outline"
					testID="deregister-back-button"
					onPress={handleDeallocation}>
					DEALLOCATE
				</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 18, fontWeight: "bold" },
	timeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	formWrapper: {
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		marginTop: -20,
	},
	indicator: {
		justifyContent: "center",
		alignItems: "center",
	},
});
