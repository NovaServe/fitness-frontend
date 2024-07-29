import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/pages/Login';
import Logout from './auth/pages/Logout';
import Training from './training/pages/Training';
import ListUsers from './users/pages/ListUsers';
import CreateUser from './users/pages/CreateUser';
import Navbar from './share/components/navbar/Navbar';

function App () {
  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin/training' element={<Training />} />
          <Route path='/customer/training' element={<Training />} />
          <Route path='/customer/training' element={<Training />} />
          <Route path='/admin/users' element={<ListUsers />} />
          <Route path='/admin/users/add' element={<CreateUser />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
