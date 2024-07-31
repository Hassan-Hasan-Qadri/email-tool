import './App.css';
import MyEmailEditor from './components/emailEditor';
import TemplateList from './components/templateList';
import EmailSender from './components/emailSender';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
;


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyEmailEditor />}/>
        <Route path="/templatelist" element={<TemplateList />}/>
        <Route path="/emailsender" element={<EmailSender />}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
