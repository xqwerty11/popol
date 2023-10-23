import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext;

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);

	return (
		<GlobalContext.Provider value={(MenuOpen, setMenuOpen)}>{children}</GlobalContext.Provider>
	);
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	return globalContext;
}
