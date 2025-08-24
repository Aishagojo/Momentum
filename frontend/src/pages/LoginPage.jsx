import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => { if (user) nav("/dashboard"); }, [user, nav]);
  return <LoginForm />;
}
