function Post({ post, handleDeletePost, currentUser }) {
  return (
    <div>
      {post.user.username}: {post.content}
      {currentUser.username === post.user.username && (
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0.5 px-1 border border-gray-400 rounded shadow"
          onClick={handleDeletePost}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default Post;
