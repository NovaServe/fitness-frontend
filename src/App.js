import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/pages/Login';
import Logout from './auth/pages/Logout';
import GetTrainings from './trainings/pages/GetTrainings';
import GetUsers from './users/pages/GetUsers';
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
          <Route path='/admin/trainings' element={<GetTrainings />} />
          <Route path='/customer/trainings' element={<GetTrainings />} />
          <Route path='/customer/trainings' element={<GetTrainings />} />
          <Route path='/admin/profiles' element={<GetUsers />} />
          <Route path='/admin/profiles/add' element={<CreateUser />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
