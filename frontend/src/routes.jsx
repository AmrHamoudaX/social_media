import App from "./App";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserProfile from "./components/UserProfile";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
];

export default routes;
