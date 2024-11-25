import { useRef, useEffect } from 'react';

export const useAbortController = () => {
	const abortController = useRef<AbortController>(new AbortController());

	useEffect(() => {
		return () => abortController.current.abort();
	}, []);

	return {
		abortController: abortController.current
	};
};
