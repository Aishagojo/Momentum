import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;              // TODO: show spinner if you have one
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
