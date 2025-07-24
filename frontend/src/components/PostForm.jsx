function PostForm({ addPost, newPost, handlePostChange }) {
  return (
    <div>
      <form onSubmit={addPost}>
        <label className="block text-gray-700 text-m font-bold mb-2">
          Enter newPost:
        </label>
        <input
          className="bg-blue-300 shadow appearance-none border rounded w-medium py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={newPost}
          onChange={handlePostChange}
        />
      </form>
    </div>
  );
}

export default PostForm;
