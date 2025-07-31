import { useEffect, useState } from "react";
import postService from "./services/posts";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";

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
    <Router>
      {user ? (
        <div>
          <div>
            <Link style={padding} to="/">
              {" "}
              IamLogo{" "}
            </Link>
            <Link style={padding} onClick={handleLogout} to="/login">
              Log Out
            </Link>
          </div>
          <p>
            <span className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {" "}
              {user && `${user.username} logged-in successfully`}
            </span>
          </p>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginForm userToLogin={user} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
