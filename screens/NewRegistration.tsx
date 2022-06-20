import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { S1, S2 } from "../components/Spacing/spacing";
import { GlobalStateContext } from "../context/GlobalState";

export default function NewRegistration({
	navigation,
	route,
}: NativeStackScreenProps<any>) {
	const { setData, data } = useContext(GlobalStateContext);
	const [regNum, setRegNum] = useState("");
	const lotNum = route.params!.lotNum;
	const [dateModalState, setDateModalState] = useState({
		isOpen: false,
		date: new Date(),
	});
	const handleSave = () => {
		const updatedData = [...data];

		const lotIns = updatedData.find((i) => +i.lotNum === lotNum);
		lotIns!.carRegistrationNum = regNum;
		lotIns!.startTime = dateModalState.date;

		setData({
			data,
		});
		navigation.goBack();
	};
	return (
		<Layout style={{ flex: 1, justifyContent: "space-between" }}>
			<Layout style={{ flex: 1, alignItems: "center" }}>
				<Image
					style={{ width: "100%", height: "100%" }}
					source={require("../assets/images/enter-details-cover.png")}
				/>
			</Layout>
			<Layout level="4" style={styles.formWrapper}>
				<Text style={styles.title}>
					New Car Registration on Lot No: {lotNum}
				</Text>
				<S1 />
				<Input
					testID="parking-drawing-registration-input"
					label="Car Number"
					maxLength={20}
					value={regNum}
					onChangeText={(val) => setRegNum(val)}
					keyboardType="default"
					size="large"
					placeholder="Ex: MH-40065"
				/>
				<S1 />
				{dateModalState.isOpen && (
					<DateTimePickerModal
						isDarkModeEnabled
						isVisible={true}
						date={dateModalState.date}
						mode="time"
						onConfirm={(date) =>
							setDateModalState({ isOpen: false, date: date })
						}
						onCancel={() => {
							setDateModalState({ ...dateModalState, isOpen: false });
						}}
					/>
				)}
				<Input
					showSoftInputOnFocus={false}
					label="Select time"
					onPressIn={() =>
						setDateModalState({ ...dateModalState, isOpen: true })
					}
					value={format(dateModalState.date, "h:mm a")}
					size="large"
					placeholder="Ex: MH-40065"
				/>
				<S2 />
				<Button testID="parking-drawing-add-carbutton" onPress={handleSave}>
					SAVE
				</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: { fontSize: 18, fontWeight: "bold" },
	formWrapper: {
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		marginTop: -20,
	},
});
