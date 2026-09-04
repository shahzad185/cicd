import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>Compleltey different tile to break test</h1>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </main>
  );
}
