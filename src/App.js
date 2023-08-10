import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Dashboard from './components/Dashboard';
import Notification from './components/Notifications';
import Users from './components/Users';
import Login from './pages/Login';

function App() {
  return (
    <div className="App main-content">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Login />} />
          <Route path='/admin' element={<Admin />} >
            <Route path='/admin/' element={<Dashboard />} />
            <Route path='/admin/notifications' element={<Notification />} />
            <Route path='/admin/users' element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
