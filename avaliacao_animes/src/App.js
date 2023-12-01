import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Menu from './componentes/utils/Menu.jsx';
import React, { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/anime" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
