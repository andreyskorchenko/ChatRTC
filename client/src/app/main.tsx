import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { UserProvider, SocketProvider } from '@/app/providers';
import { router } from '@/app/router';
import '@/app/styles/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<SocketProvider>
				<RouterProvider router={router} future={{ v7_startTransition: true }} />
			</SocketProvider>
		</UserProvider>
	</StrictMode>
);
