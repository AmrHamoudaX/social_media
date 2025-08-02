import App from "../App";
import Home from "./Home";
import LoginForm from "./LoginForm";
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
];

export default routes;
