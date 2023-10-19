import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { isOpen: false },
	reducers: {
		toggle: (state) => {
			state.isOpen = !state.isOpen;
		},
		close: (state) => {
			state.isOpen = false;
		},
	},
});

export const { toggle, close } = menuSlice.actions;
export default menuSlice.reducer;
