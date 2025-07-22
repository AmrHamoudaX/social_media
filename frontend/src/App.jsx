import { useEffect, useState } from "react";
import postService from "./services/posts";
import Post from "./components/Post";
import loginService from "./services/login";
import Notification from "./components/Notification";

function App() {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await postService.getAll();
        setPosts(allPosts);
      } catch (e) {
        console.error(`Error fetching posts: ${e}`);
      }
    }
    fetchPosts();
  }, [newContent]);

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
    } catch {
      setErrorMsg("Wrong credentials");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }

  function loginForm() {
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>
            email
            <input
              type="text"
              value={email}
              name="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }

  async function addPost(e) {
    e.preventDefault();
    try {
      await postService.create({ content: newContent });
      setNewContent("");
    } catch {
      setErrorMsg("wrong post input");
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  }

  function handlePostChange(e) {
    setNewContent(e.target.value);
  }

  function postForm() {
    return (
      <form onSubmit={addPost}>
        <input value={newContent} onChange={handlePostChange} />
      </form>
    );
  }

  return (
    <>
      <Notification message={errorMsg} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>{" "}
          </p>
          {postForm()}
        </div>
      )}
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
}

export default App;
