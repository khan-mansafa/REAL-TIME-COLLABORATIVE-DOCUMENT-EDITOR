# REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR
COMPANY: CODTECH IT SOLUTIONS

NAME: KHAN MANSAFA FEROZ

INTERN ID: CT04DY1977

DOMAIN: Full Stack Web Development.

DURATION: 4 WEEKS

MENTOR: NEELA SANTOSH

TASK 3

* DESCRIPTION:
Real-Time Collaborative Document Editor

The Real-Time Collaborative Document Editor is a web application designed to allow multiple users to simultaneously create, edit, and format documents in real time. It ensures that any changes made by one user are immediately visible to all other users connected to the same document, providing a seamless collaborative experience similar to popular online editors.

* Features

Real-Time Collaboration: Users can join the same document room via a unique document ID. Changes are instantly propagated to all connected clients.

Rich Text Editing: The editor supports bold, italic, underline, headings, ordered and unordered lists, and clearing formats using the intuitive Quill.js toolbar.

Document Persistence: Documents are automatically saved to PostgreSQL every 2 seconds, ensuring no data is lost on disconnect or refresh.

Safe JSON Handling: Document content is stored and transmitted as JSON to maintain formatting and prevent errors.

Responsive UI: Designed for desktops, tablets, and mobile devices using React.js, providing a smooth and interactive interface.

Robust Socket Communication: Socket.IO ensures efficient transmission of changes and prevents conflicts during simultaneous edits.

* Technologies Used

Frontend	React.js – Builds dynamic, interactive, and responsive UI components.

Text Editor	Quill.js – Provides a rich WYSIWYG editor with formatting options.

Backend	Node.js & Express – Handles HTTP requests, API endpoints, and server logic.

Real-Time	Socket.IO – Manages WebSocket connections for instant collaboration.

Database	PostgreSQL – Stores document data persistently.

Environment	dotenv – Manages sensitive variables like database credentials.

OUTPUT:

<img width="1919" height="626" alt="Image" src="https://github.com/user-attachments/assets/11371983-a14a-4b88-a2e7-89db4b1e63b9" />


<img width="1919" height="1034" alt="Image" src="https://github.com/user-attachments/assets/c6baec5b-9fb7-4090-8aca-8761f284b2b1" />
