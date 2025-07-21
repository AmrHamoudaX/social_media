import { useEffect, useState } from "react";
import postService from "./services/posts";
import Post from "./components/Post";
import loginService from "./services/login";

function App() {
  const [posts, setPosts] = useState([]);
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
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await loginService.login({
        email,
        password,
      });
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
    <form onSubmit={handleLogin}>
      <div>
        email
        <input
          type="text"
          value={email}
          name="Username"
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
    </form>;
  }

  return (
    <>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
}

export default App;
