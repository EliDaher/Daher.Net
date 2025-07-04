import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const userStr = localStorage.getItem("DaherUser");
  if (!userStr) return <Navigate to="/Daher.Net/login" replace />;

  try {
    const user = JSON.parse(userStr);
    if (allowedRoles.includes(user.role)) {
      return <>{children}</>;
    } else {
      return <Navigate to="/Daher.Net/unauthorized" replace />;
    }
  } catch {
    return <Navigate to="/Daher.Net/login" replace />;
  }
}
