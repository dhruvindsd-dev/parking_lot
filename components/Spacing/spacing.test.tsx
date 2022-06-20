import renderer from "react-test-renderer";
import { S1, S2, S3 } from "./spacing";

test("Spacing 1 Renders", () => {
	const tree = renderer.create(<S1 />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("Spacing 2 Renders", () => {
	const tree = renderer.create(<S2 />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("Spacing 3 Renders", () => {
	const tree = renderer.create(<S3 />).toJSON();
	expect(tree).toMatchSnapshot();
});
