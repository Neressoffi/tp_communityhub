import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const user = useSelector((state) => state.auth.user);
  const isAdmin =
    user?.role === 'admin' ||
    user?.is_admin === true ||
    user?.is_admin === 1 ||
    user?.user_status_id === 3;

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
