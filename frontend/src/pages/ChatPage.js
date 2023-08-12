import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const room = localStorage.getItem("room");
  const socket = useRef();
  const [welcome, setWelcome] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  socket.current = io("http://localhost:5000/", {
    query: {
      name,
      room,
    },
  });

  useEffect(() => {
    if (socket.current) {
      socket.current.on("welcome", (payload) => {
        setWelcome(payload);
      });
      socket.current.on("send-message", (payload) => {
        setMessages((prevMessages) => {
          let newArray = [...prevMessages, payload];
          console.log(newArray);
          return newArray;
        });
      });
      socket.current.emit('joined-room', name);

    }
  }, []);

  const leaveRoom = () => {
    localStorage.clear();
    navigate("/");
    socket.current.emit('leave-room', 'I left the chat.');   
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.current.emit("send-message", message);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <button className="btn" onClick={leaveRoom}>
          Leave Room
        </button>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{room}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="message">
            <p className="meta">
              Chat Bot 
            </p>
            <p className="text">{welcome}</p>
          </div>
          {messages.map((item, index) => {
            return (
              <div className="message" key={index}>
                <p className="meta" key={index+1}>{item.sender}</p>
                <p className="text" key={index+3}>{item.message}</p>
              </div>
            );
          })}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={sendMessage}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn" type="submit">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
