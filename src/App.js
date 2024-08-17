
import { useState, useEffect, useContext } from 'react';
import './App.css';
import Navbar from "../src/components/Navbar"
import Footer from "../src/components/Footer"
import Home from "../src/pages/Home"
import Report from "../src/pages/Report"
import Month from "../src/pages/Month"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddData from './pages/AddData';
import AddCategory from './components/AddCategory';
import Register from './components/Register';
import { AuthProvider,Authcontext } from './components/Authcontext'

import React from 'react'

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <AppContent />
        </Router>
      </div>
    </AuthProvider>
  )
}


function AppContent() {

  const {isAuthenticated, demo} = useContext(Authcontext)
 const [IsdataAdd, setIsdataAdd] = useState(false)
  const handleDataAdded = () => {
    setIsdataAdd(true)
  };

const handleOnUpdate= ()=>{
  try {
    setIsdataAdd(false)
  } catch (error) {
    
  }
}

  return (
    <div className="App">
        {isAuthenticated || demo ? (

          <>
            <div className="home">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home isdataAdded={IsdataAdd} onUpdate={handleOnUpdate}/>} />
                <Route path="/Month" element={<Month />} />
                <Route path="/Report" element={<Report />} />
                <Route path="/Category" element={<AddCategory />} />
              </Routes>
              <AddData onDataAdded={handleDataAdded}/>
              <Footer />
            </div>
          </>
        ) : (
          <>
            <Register />
            <Footer />
          </>
        )}


    </div>
  );
}





export default App;
