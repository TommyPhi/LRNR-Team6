import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from './components/Header';
import './App.css';
import Home from './Home';
import Account from './components/Account';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import Results from './components/Results';

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
            <Route path="/results" element={<Results />} />
          </Routes>
        </>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

