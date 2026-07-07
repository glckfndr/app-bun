import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Failed to load message.");
      });
  }, []);

  return (
    <div>{message}  </div>
  )
}

export default App
