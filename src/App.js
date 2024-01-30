import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from './components/Header';
import './App.css';
import Home from './Home';
import Account from './Account';
import Quiz from './Quiz';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />}/>
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

