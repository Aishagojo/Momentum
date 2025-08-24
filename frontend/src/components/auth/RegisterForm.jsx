import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const { register } = useAuth();
  const [full_name, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    await register({ full_name, email, password });
    setOk("Account created — you can log in now.");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-3 p-6 border rounded">
      <h2 className="text-xl font-semibold">Create account</h2>
      {ok && <p className="text-green-700">{ok}</p>}
      <input className="w-full border p-2 rounded" placeholder="Full name"
             value={full_name} onChange={(e)=>setFullName(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Email"
             type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Password"
             type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="w-full bg-black text-white p-2 rounded">Register</button>
      <p className="text-sm">Have an account? <Link className="underline" to="/login">Login</Link></p>
    </form>
  );
}
