import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const SAVE_INTERVAL_MS = 2000;

export default function Editor({ documentId }) {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const wrapperRef = useRef();

  // Setup socket
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  // Initialize Quill editor with toolbar options
  useEffect(() => {
    if (!wrapperRef.current) return;

    const q = new Quill(wrapperRef.current, {
      theme: "snow",
      placeholder: "Start typing your document...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"]
        ]
      }
    });

    q.disable();
    q.setText("Loading...");
    setQuill(q);

    return () => {
      if (wrapperRef.current) wrapperRef.current.innerHTML = "";
    };
  }, []);

  // Load document from server
  useEffect(() => {
    if (!socket || !quill) return;

    socket.once("load-document", (doc) => {
      try {
        const content = doc ? JSON.parse(doc) : "";
        quill.setContents(content || "");
      } catch (err) {
        console.error("Invalid JSON from server:", doc, err);
        quill.setContents("");
      }
      quill.enable();
    });

    socket.emit("join-document", documentId);
  }, [socket, quill, documentId]);

  // Send user changes to server
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [socket, quill]);

  // Receive changes from other users
  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta) => quill.updateContents(delta);
    socket.on("receive-changes", handler);
    return () => socket.off("receive-changes", handler);
  }, [socket, quill]);

  // Auto-save document every 2 seconds
  useEffect(() => {
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      socket.emit("save-document", JSON.stringify(quill.getContents()));
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [socket, quill]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: "500px",
        backgroundColor: "#fff",
        border: "1px solid #ccc"
      }}
    ></div>
  );
}
