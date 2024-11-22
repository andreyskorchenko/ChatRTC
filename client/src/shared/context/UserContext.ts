import { createContext, Dispatch, SetStateAction } from 'react';

type Username = string | null;
type UserContext = {
	username: Username;
	setUsername: Dispatch<SetStateAction<Username>>;
};

export const UserContext = createContext<UserContext>({} as UserContext);
