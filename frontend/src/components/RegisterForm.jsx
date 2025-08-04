import { useState } from "react";
import userService from "../services/users";
import loginService from "../services/login";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  async function createUser(userObject) {
    try {
      const createdUser = await userService.create(userObject);
      const user = await loginService.login({
        //Use userObject instead of createUser or you will you use the hashed password
        email: userObject.email,
        password: userObject.password,
      });
      window.localStorage.setItem("loggedPostappUser", JSON.stringify(user));
      navigate("/");
    } catch {
      console.log("wrong user input");
    }
  }

  function handleRegistration(e) {
    e.preventDefault();
    createUser(userInfo);
    setUserInfo({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <form
        onSubmit={handleRegistration}
        className="p-8 rounded-lg shadow-md w-full max-w-sm bg-gray-900 "
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-100 text-sm/6 font-medium mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="name"
            autoComplete="name"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm/6  text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-100 text-sm/6 font-medium mb-2"
          >
            UserName
          </label>
          <input
            id="userName"
            type="userName"
            autoComplete="userName"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm/6  text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            required
          />
        </div>
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
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
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
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm/6 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
