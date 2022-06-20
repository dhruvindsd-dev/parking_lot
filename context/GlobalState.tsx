import React, { createContext, useState } from "react";
export interface LotType {
	lotNum: number;
	carRegistrationNum?: string;
	startTime?: Date;
}
export interface GlobalStateContextType {
	data: LotType[];
	setData: (val: Partial<GlobalStateContextType>) => void;
}

const initialState: GlobalStateContextType = {
	data: [],
	setData: () => {},
};

export const GlobalStateContext =
	createContext<GlobalStateContextType>(initialState);

export const GlobalContextWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, setState] = useState<GlobalStateContextType>(initialState);
	const setData = (val: Partial<GlobalStateContextType>) => {
		setState({
			...state,
			...val,
		});
	};
	return (
		<GlobalStateContext.Provider value={{ ...state, setData }}>
			{children}
		</GlobalStateContext.Provider>
	);
};
interface GlobalStateProps {}
