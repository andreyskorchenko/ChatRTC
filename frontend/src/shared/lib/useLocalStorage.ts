type DateType<T> = Record<keyof T, T[keyof T]>;

export const useLocalStorage = () => {
	const set = (key: string, value: Record<string, unknown>) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch {
			return false;
		}
	};

	const get = <T extends DateType<T>>(key: string): DateType<T> | null => {
		try {
			const value = localStorage.getItem(key);
			if (typeof value !== 'string') return null;
			return JSON.parse(value);
		} catch {
			return null;
		}
	};

	return { set, get };
};
