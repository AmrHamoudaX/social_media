import React, { useEffect, useState } from "react";
import loginService from "../services/login";
import postService from "../services/posts";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPostappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });
      window.localStorage.setItem("loggedPostappUser", JSON.stringify(user));
      postService.setToken(user.token);
      setUser(user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch {
      console.log("Wrong credentials");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto " />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <form
        onSubmit={handleLogin}
        className="p-8 rounded-lg shadow-md w-full max-w-sm bg-gray-900 "
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-100 text-sm/6 font-medium mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm/6  text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-gray-100 text-sm/6 font-medium mb-2"
            >
              Password
            </label>
            <div className="text-sm items-end mb-2">
              <Link
                href="#"
                className="font-semibold text-indigo-400 hover:text-indigo-300 "
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm/6 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Sign In
        </button>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register here
          </Link>
        </p>{" "}
      </form>
    </div>
  );
}
//
export default LoginForm;
