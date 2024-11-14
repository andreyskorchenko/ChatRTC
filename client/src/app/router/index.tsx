import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/main/ui';
import { RoomPage } from '@/pages/room/ui';

export const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <MainPage />
		},
		{
			path: '/room/:roomId',
			element: <RoomPage />
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
