import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EntryPage from './pages/EntryPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<EntryPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App