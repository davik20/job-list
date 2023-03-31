import React, { useState , useEffect} from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import { useAppState } from "../../../context/AppStateContext";

const Auth: React.FC = () => {
  const [form, setForm] = useState<"register" | "login">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setAdmin, admin } = useAppState();
  const router = useRouter();



  useEffect(()=> {
    if(admin){
      router.push('/admin/jobs');
    }
  }, [])


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithPassword({ email, password });
    console.log(result);
    setAdmin(result.data.user);
    const { error } = result;
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/jobs");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    console.log(error);
    if (error) {
      setError(error.message);
    } else {
      setError("Check your email for the activation link");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center">Admin {form}</h1>
          {error && <div className="text-red-500">{error}</div>}
          <form
            onSubmit={form === "login" ? handleLogin : handleRegister}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {form}
            </button>
          </form>
          <button
            onClick={() =>
              setForm(prev => (prev === "login" ? "register" : "login"))
            }
            className="w-full mt-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Switch to {form === "login" ? "register" : "login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
