import { useState } from "react";

const Box = () => {
  // box color state
  const [boxColor, setBoxColor] = useState<string>("blue");

  //   handlechange
  const handleToggle = () => {
    setBoxColor(boxColor === "blue" ? "red" : "blue");
  };

  return (
    <div>
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: boxColor ? boxColor : "blue",
        }}
      ></div>
      <button onClick={handleToggle}>Click me to toggle colors</button>
      <input
        type="text"
        placeholder="your favorite color"
        value={boxColor}
        onChange={(e) => setBoxColor(e.target.value)}
      />
    </div>
  );
};

export default Box;
