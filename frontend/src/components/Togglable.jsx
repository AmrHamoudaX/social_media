import { useState } from "react";

function Togglable(props) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  function toggleVisibility() {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={toggleVisibility}
        >
          {" "}
          {props.buttonLabel}{" "}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={toggleVisibility}
        >
          {" "}
          cancel{" "}
        </button>
      </div>
    </div>
  );
}

export default Togglable;
