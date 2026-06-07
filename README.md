# ScreenBridge 🚀

A modern real-time screen sharing web application built using **React**, **Node.js**, **Socket.IO**, and **WebRTC**.

---

## ✨ Features

* 🔴 Real-time Screen Sharing
* ⚡ WebRTC Peer-to-Peer Connection
* 🌐 Socket.IO Signaling Server
* 🧠 Unique Room ID Generation
* 👥 Host & Viewer System
* 🎨 Modern Futuristic UI
* 📺 Live Stream Viewing Dashboard
* 🔐 Encrypted Peer Connection
* ⚡ Low Latency Streaming

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Framer Motion
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Socket.IO

### Real-Time Communication

* WebRTC

---

# 📂 Project Structure

```bash
ScreenBridge/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── index.js
│   └── socket.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/screenbridge.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# ▶️ Run Project

## Start Backend

```bash
cd backend
node index.js
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🔗 How It Works

1. Host creates a room
2. Unique Room ID gets generated
3. Viewer joins using Room ID
4. Socket.IO exchanges signaling data
5. WebRTC establishes peer connection
6. Screen stream gets shared directly

---

# 🧠 WebRTC Flow

```text
Host
 ↓
Create Offer
 ↓
Viewer Receives Offer
 ↓
Create Answer
 ↓
ICE Candidate Exchange
 ↓
Peer Connection Established
 ↓
Live Screen Sharing
```

---

# 📸 Future Improvements

* 🎤 Audio Sharing
* 👥 Multiple Viewers
* 💬 Live Chat
* ☁️ TURN Server Support
* 📱 Mobile Support
* 🎥 Stream Recording
* 🔐 Authentication System
* 📊 Stream Analytics

---

# 👨‍💻 Developer

Built with ❤️ by Aryan Yadav

---

# 📜 License

This project is licensed under the MIT License.
