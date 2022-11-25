import React from 'react';
import './App.css';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Footer from './componentes/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/login/Login';




function App() {
  return (
    <> 
      <Router> 
        <Navbar/> 
        <Routes>
          
          <Route path='/Home' element={<Home />}/>

          <Route path='/Login' element={<Login />}/>

        </Routes>
        <Footer/>
      </Router>
    </>
  )
}
export default App;
