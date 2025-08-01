import { useEffect, useState } from "react";
import postService from "./services/posts";
import Home from "./components/Home";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);
  const padding = { padding: 5 };

  function handleLogout() {
    window.localStorage.removeItem("loggedPostappUser");
    setUser(null);
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedPostappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <Home user={user} />
    </div>
  );
}

export default App;
