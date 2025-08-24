import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/dashboard");
    } catch {
      setErr("Invalid email or password");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-3 p-6 border rounded">
      <h2 className="text-xl font-semibold">Login</h2>
      {err && <p className="text-red-600">{err}</p>}
      <input className="w-full border p-2 rounded" placeholder="Email"
             type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Password"
             type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="w-full bg-black text-white p-2 rounded">Sign in</button>
      <p className="text-sm">No account? <Link className="underline" to="/register">Register</Link></p>
    </form>
  );
}
