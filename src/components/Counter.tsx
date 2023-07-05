import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>Decrement -</button>
      <button onClick={() => setCount(count + 1)}>Increment +</button>
    </div>
  );
};

export default Counter;
