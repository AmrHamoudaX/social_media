import { useEffect, useState } from "react"
import postService from "./services/posts"
import Post from "./components/Post"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    async function fetchPosts(){
      try{
        const allPosts = await postService.getAll()
        setPosts(allPosts)
      }catch(e){
        console.error(`Error fetching posts: ${e}`)
      }
    }
      fetchPosts()
  }, [])
  return(
  <>
      {posts.map((post) => {
       return <Post key={post.id} post={post} /> 
      })}
  </>
  )

}

export default App
