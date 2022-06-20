import renderer from "react-test-renderer";
import Item from "./Item";

test("Home Parking Lot Component Renders Correctly", () => {
	const tree = renderer
		.create(
			<Item
				lotNum={1}
				onPress={() => {}}
				carRegistrationNum={"Mh-101"}
				startTime={new Date("12-12-12")}
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
