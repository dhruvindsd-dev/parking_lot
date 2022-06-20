import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { S1, S3 } from "../components/Spacing/spacing";
import { GlobalStateContext } from "../context/GlobalState";

export default function EnterDetails() {
	const [spaces, setSpaces] = useState<string>("");
	const [err, setErr] = useState("");

	const { setData } = useContext(GlobalStateContext);

	const handleClick = () => {
		if (spaces === "" || spaces.toString().match(/[^0-9]/g)) {
			setErr("please enter a valid number");
			return;
		}

		const data = Array(+spaces)
			.fill("0")
			.map((_, i) => ({ lotNum: i + 1 }));
		setData({ data });
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
					Add the number of spaces in the parking lot:
				</Text>
				<S3 />
				<Input
					testID="Parking-create-text-input"
					maxLength={2}
					value={spaces?.toString()}
					onChangeText={(val) => setSpaces(val)}
					keyboardType="number-pad"
					size="large"
					placeholder="Ex: 20"
					caption={err}
				/>
				<S1 />
				<Button testID="Parking-create-submit-button" onPress={handleClick}>
					CREATE PARKING LOT
				</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 20, fontWeight: "bold" },
	formWrapper: {
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		marginTop: -20,
	},
});
