import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="admin/login" element={<Login />} />
            <Route path="/*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    );
  }
}

export default App;
