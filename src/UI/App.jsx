// import { BrowserRouter, createBrowserRouter, HashRouter, RouterProvider } from 'react-router-dom'
import {HashRouter, Routes, Route } from 'react-router-dom';

import Slidebaar from '../components/Slidebaar.jsx';
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import Navbar from '../components/Navbar.jsx';




function App() {


  return (
    <>
          <HashRouter>
              <Navbar />
              <Slidebaar />
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/slidebaar' element={<Slidebaar />} /> */}
            </Routes >
          </HashRouter>

    </>

  );
}

export default App;
