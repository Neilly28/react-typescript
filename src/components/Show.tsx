import React, { useState } from "react";

const Show = () => {
  const [showInput, setShowInput] = useState(false);

  const handleToggle = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {!showInput ? "show input" : "hide input"}
      </button>
      {showInput && <input type="text" placeholder="helloo...." />}
    </div>
  );
};

export default Show;
