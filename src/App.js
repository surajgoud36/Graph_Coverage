import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import GeneratePage from './pages/GeneratePage';
import ExamplePage from './pages/ExamplePage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GeneratePage/>}/>
        <Route path="/example" element={<ExamplePage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;