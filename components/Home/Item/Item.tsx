import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LotType } from "../../../context/GlobalState";

const Item = ({
	onPress,
	lotNum,
	startTime,
	carRegistrationNum,
}: LotType & { onPress: () => void }) => {
	return (
		<TouchableOpacity
			testID={
				carRegistrationNum
					? `parking-drawing-registered-${lotNum}`
					: `parking-drawing-space-${lotNum}`
			}
			onPress={onPress}
			style={styles.container}>
			<View
				style={{
					...styles.item,
					backgroundColor: carRegistrationNum ? "#5781FF" : undefined,
				}}>
				<Text
					style={{
						...styles.text,
						color: carRegistrationNum ? "white" : undefined,
					}}>
					{lotNum}
				</Text>
				{carRegistrationNum && (
					<Text
						testID={`parking-drawing-space-number-${lotNum}`}
						style={{ fontSize: 10, color: "white" }}>
						{carRegistrationNum}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		maxWidth: "25%",
	},
	item: {
		minHeight: 90,
		padding: 10,
		margin: 5,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#5781FF",
		flex: 1,
		backgroundColor: "#F5F7FF",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",

		// box-shadow:  20px 20px 60px #bebebe,
		//  -20px -20px 60px #ffffff;
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#5781FF",
	},
});

export default Item;
