import App from "../App";
import Home from "./Home";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";

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
