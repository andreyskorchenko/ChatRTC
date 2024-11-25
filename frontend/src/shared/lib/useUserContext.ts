import { useContext } from 'react';
import { UserContext } from '@/shared/context';

export const useUserContext = () => useContext(UserContext);
