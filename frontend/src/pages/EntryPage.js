import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EntryPage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('JavaScript');
  const navigate = useNavigate();
    const handleSubmit = (e)=>{
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('room', room);
    navigate(`/chat`);
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form action="chat.html" onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label >Room</label>
            <select name="room" value={room} onChange={(e)=>setRoom(e.target.value)} id="room">
              <option value="JavaScript" >JavaScript</option>
              <option value="Python" >Python</option>
              <option value="PHP" >PHP</option>
              <option value="C#" >C#</option>
              <option value="Ruby" >Ruby</option>
              <option value="Java" >Java</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default EntryPage;
