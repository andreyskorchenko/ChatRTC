import { useContext } from 'react';
import { SocketContext } from '@/shared/context';

export const useSocketContext = () => useContext(SocketContext);
