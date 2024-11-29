import { useRef, useEffect } from 'react';

export const useAbortController = () => {
	const abortController = useRef<AbortController>(new AbortController());

	useEffect(() => {
		return () => abortController.current.abort(); // eslint-disable-line
	}, []);

	return {
		abortController: abortController.current
	};
};
