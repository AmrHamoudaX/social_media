import { useEffect, useRef, useState } from "react";
import Togglable from "./Togglable";
import Post from "./Post";
import PostForm from "./PostForm";
import postService from "../services/posts";

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const postFormRef = useRef();

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

  async function createPost(postObject) {
    try {
      postFormRef.current.toggleVisibility();
      const createdPost = await postService.create(postObject);
      setPosts(posts.concat({ ...createdPost, user }));
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
    <div>
      {/* <Notification message={errorMsg} /> */}
      <div>
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
    </div>
  );
}

export default Home;
