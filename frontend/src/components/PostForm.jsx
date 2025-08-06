import { useState } from "react";

function PostForm({ createPost, visibilityRef }) {
  const [newPostContent, setNewPostContent] = useState("");

  function addPost(e) {
    e.preventDefault();
    createPost({
      content: newPostContent,
    });
    setNewPostContent("");
  }

  function handlePostChange(e) {
    setNewPostContent(e.target.value);
  }

  return (
    <div>
      <form onSubmit={addPost}>
        <div className="editor mt-10 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <textarea
            className="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
            spellCheck="true"
            placeholder="Describe everything about this post here"
            onChange={handlePostChange}
          ></textarea>
          {/* Icons  */}
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              {newPostContent.length}/300
            </div>
          </div>
          {/* Buttons */}
          <div className="buttons flex">
            <button
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
              type="button"
              onClick={() => visibilityRef.current.toggleVisibility()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-100 ml-2 bg-indigo-500"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
