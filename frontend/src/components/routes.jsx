import App from "../App";
import Home from "./Home";
import LoginForm from "./LoginForm";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
];

export default routes;
