import React from "react";
import Editor from "./components/Editor";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Real-Time Collaborative Document Editor</h1>
      {/* documentId = 1 (default) */}
      <Editor documentId="1" />
    </div>
  );
}

export default App;
