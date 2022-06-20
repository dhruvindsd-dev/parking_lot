import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalContextWrapper } from "./context/GlobalState";
import Navigation from "./navigation";

export default function App() {
	return (
		<SafeAreaProvider>
			<RootSiblingParent>
				<GlobalContextWrapper>
					<ApplicationProvider {...eva} theme={eva.light}>
						<Layout style={{ flex: 1 }}>
							<Navigation />
							<StatusBar />
						</Layout>
					</ApplicationProvider>
				</GlobalContextWrapper>
			</RootSiblingParent>
		</SafeAreaProvider>
	);
}
