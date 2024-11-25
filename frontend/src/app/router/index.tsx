import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';
import { AuthPage } from '@/pages/auth/ui';
import { MainPage } from '@/pages/main/ui';
import { RoomPage } from '@/pages/room/ui';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <ProtectedRoutes />,
			children: [
				{
					path: '/',
					element: <MainPage />
				},
				{
					path: '/room/:roomId',
					element: <RoomPage />
				}
			]
		},
		{
			path: '/auth',
			element: <AuthPage />
		}
	],
	{
		future: {
			v7_fetcherPersist: true,
			v7_partialHydration: true,
			v7_relativeSplatPath: true,
			v7_normalizeFormMethod: true,
			v7_skipActionErrorRevalidation: true
		}
	}
);
