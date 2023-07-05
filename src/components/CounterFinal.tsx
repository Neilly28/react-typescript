import { useState } from "react";

const CounterFinal = () => {
  const [number, setNumber] = useState<number>(0);

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number - 1)}>Decrement</button>
      <button onClick={() => setNumber(number + 1)}>Increment</button>
    </div>
  );
};

export default CounterFinal;
