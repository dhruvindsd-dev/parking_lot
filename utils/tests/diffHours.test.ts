import diffHours from "../diffHours";

test("Difference between two dates given in hours", () => {
	const now = new Date();

	const nowPlusHour = new Date();
	nowPlusHour.setTime(now.getTime() + 1 * 60 * 60 * 1000);

	expect(diffHours(nowPlusHour, now)).toBe(1);
});
