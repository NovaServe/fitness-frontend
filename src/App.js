import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './share/Navbar';
import Home from './home/Home';
import Login from './auth/pages/Login';
import Logout from './auth/pages/Logout';
import AdminTraining from './role-admin/training/pages/AdminTraining';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin/training' element={<AdminTraining />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
