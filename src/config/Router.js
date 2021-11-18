import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../page/Login/login';
import Home from '../page/Home/home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
