import { PropsWithChildren, useState } from 'react';
import { UserContext } from '@/shared/context';
import { useLocalStorage } from '@/shared/lib';

export const UserProvider = ({ children }: PropsWithChildren) => {
	const { get } = useLocalStorage();
	const [username, setUsername] = useState<string | null>(() => {
		return get<{ username: string }>('auth')?.username ?? null;
	});

	return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
};
