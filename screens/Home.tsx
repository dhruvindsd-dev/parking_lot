import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Layout } from "@ui-kitten/components";
import { useContext } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import Item from "../components/Home/Item/Item";
import { GlobalStateContext } from "../context/GlobalState";

export default function Home({ navigation }: NativeStackScreenProps<any>) {
	const { data } = useContext(GlobalStateContext);

	const handleNewButton = () => {
		for (let item of data) {
			if (item.carRegistrationNum === undefined) {
				// navigate to register page
				navigation.navigate("NewRegistration", { lotNum: item.lotNum });
				return;
			}
		}
		Toast.show("Parking Lot is Full", { duration: Toast.durations.SHORT });
	};

	return (
		<Layout style={styles.container}>
			<Layout style={styles.parkingSpaces}>
				<FlatList
					numColumns={4}
					scrollEnabled
					keyExtractor={(i) => i.lotNum.toString()}
					data={data}
					renderItem={({ item }) => (
						<Item
							onPress={() =>
								navigation.navigate(
									item.carRegistrationNum ? "Checkout" : "NewRegistration",
									{ lotNum: item.lotNum }
								)
							}
							{...item}
						/>
					)}
				/>
			</Layout>

			<Layout style={styles.controls}>
				<Button onPress={handleNewButton}>NEW REGISTRATION</Button>
			</Layout>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		paddingTop: StatusBar.currentHeight,
	},
	parkingSpaces: { paddingBottom: 15, flex: 1 },
	controls: {
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		marginTop: -10,
	},
});
