/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalState";
import Checkout from "../screens/Checkout";
import EnterDetails from "../screens/EnterDetails";
import Home from "../screens/Home";
import NewRegistration from "../screens/NewRegistration";
import { RootStackParamList } from "../types";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
	const { data } = useContext(GlobalStateContext);
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{ headerShown: false }}>
				{data.length ? (
					<>
						<Stack.Screen name="Home" component={Home} />
						<Stack.Screen name="NewRegistration" component={NewRegistration} />
						<Stack.Screen name="Checkout" component={Checkout} />
					</>
				) : (
					<Stack.Screen name="EnterDetails" component={EnterDetails} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
