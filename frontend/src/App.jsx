import { useEffect, useRef, useState } from "react";
import postService from "./services/posts";
import Post from "./components/Post";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import Togglable from "./components/Togglable";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);
  const postFormRef = useRef();
  const padding = { padding: 5 };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await postService.getAll();
        console.log(allPosts);
        setPosts(allPosts);
      } catch (e) {
        console.error(`Error fetching posts: ${e}`);
      }
    }
    fetchPosts();
  }, []);

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

  async function createPost(postObject) {
    try {
      postFormRef.current.toggleVisibility();
      const createdPost = await postService.create(postObject);
      setPosts(posts.concat({ ...createdPost, user }));
      // setPosts([...posts, { ...createdPost, user }]);
    } catch {
      setErrorMsg("wrong post input");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }

  async function handleDeletePost(post) {
    try {
      await postService.deleteId(post.id);
      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (e) {
      setErrorMsg(e);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/login">
          {" "}
          Login{" "}
        </Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <div>
        <Notification message={errorMsg} />
        {user === null ? (
          <LoginForm userToLogin={user} />
        ) : (
          <div>
            <p>
              {user.name}{" "}
              <span className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {" "}
                logged-in successfully{" "}
              </span>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </p>
            <div>
              <Togglable buttonLabel="Create new post" ref={postFormRef}>
                <PostForm createPost={createPost} />
              </Togglable>
            </div>
            {posts
              .sort((a, b) => b.id - a.id)
              .map((post) => {
                return (
                  <Post
                    key={post.id}
                    post={post}
                    handleDeletePost={() => handleDeletePost(post)}
                    currentUser={user}
                  />
                );
              })}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
