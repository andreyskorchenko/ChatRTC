import { useEffect, useState } from 'react';

export const useMounted = (opened: boolean, unmountedDelayMs: number) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		if (opened && !isMounted) {
			setIsMounted(true);
		} else if (!opened && isMounted) {
			setTimeout(() => {
				setIsMounted(false);
			}, unmountedDelayMs);
		}
	}, [opened, isMounted, unmountedDelayMs]);

	return [isMounted];
};
