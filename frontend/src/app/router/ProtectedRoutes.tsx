import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/shared/lib';

export const ProtectedRoutes = () => {
	const userContext = useUserContext();

	if (!userContext.username) {
		return <Navigate to="/auth" replace />;
	}

	return <Outlet />;
};
