import { useEffect, useRef, useState } from "react";
import postService from "./services/posts";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Feed from "./components/Feed";

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
      <div>
        <Link style={padding} to="/login">
          {" "}
          Login{" "}
        </Link>
        <Link style={padding} to="/feed">
          {" "}
          Feed{" "}
        </Link>
      </div>
      <p>
        <span className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {" "}
          {user && `${user.username} logged-in successfully`}
        </span>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </p>
      <Routes>
        <Route path="/login" element={<LoginForm userToLogin={user} />} />
        <Route path="/feed" element={<Feed user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
