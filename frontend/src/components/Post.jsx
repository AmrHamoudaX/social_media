function Post({post}){
  return (
  <div>
      {post.user.username}:  {post.content} 
  </div>
  )
}

export default Post
