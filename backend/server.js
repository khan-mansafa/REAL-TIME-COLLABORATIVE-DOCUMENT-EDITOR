const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// API route → get a document
app.get("/api/documents/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM documents WHERE id=$1", [id]);
  if (result.rows.length === 0) return res.status(404).send("Not found");
  res.json(result.rows[0]);
});

// Socket.IO → real-time editing
io.on("connection", (socket) => {
  console.log("⚡ New user connected:", socket.id);

  socket.on("join-document", async (docId) => {
    socket.join(docId);

    // Load initial content
    const result = await pool.query("SELECT content FROM documents WHERE id=$1", [docId]);
    const content = result.rows.length ? result.rows[0].content : "";
    socket.emit("load-document", content);

    // Listen for changes
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(docId).emit("receive-changes", delta);
    });

    // Save changes
    socket.on("save-document", async (data) => {
      await pool.query("UPDATE documents SET content=$1 WHERE id=$2", [data, docId]);
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
