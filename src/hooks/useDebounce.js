import { useState, useRef } from 'react';

export const useDebounce = (value) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const blocker = useRef(null);

	clearTimeout(blocker.current);

	blocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, 500);

	return DebouncedVal;
};
