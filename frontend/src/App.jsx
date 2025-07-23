import { useEffect, useState } from "react";
import postService from "./services/posts";
import Post from "./components/Post";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import Togglable from "./components/Togglable";

function App() {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
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

  // function loginForm() {
  //   return (
  //     <>
  //       <form onSubmit={handleLogin}>
  //         <div>
  //           email
  //           <input
  //             type="text"
  //             value={email}
  //             name="email"
  //             onChange={({ target }) => setEmail(target.value)}
  //           />
  //         </div>
  //         <div>
  //           password
  //           <input
  //             type="password"
  //             value={password}
  //             name="Password"
  //             onChange={({ target }) => setPassword(target.value)}
  //           />
  //         </div>
  //         <button type="submit">login</button>
  //       </form>
  //     </>
  //   );
  // }

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

  return (
    <>
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
            <Togglable buttonLabel="Create new post">
              <PostForm
                addPost={addPost}
                newContent={newContent}
                handlePostChange={handlePostChange}
              />
            </Togglable>
          </div>
        </div>
      )}
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
}

export default App;
