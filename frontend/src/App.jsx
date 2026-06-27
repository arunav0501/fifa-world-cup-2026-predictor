import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchPredictor from './pages/MatchPredictor';
import TournamentSimulator from './pages/TournamentSimulator';
import Analytics from './pages/Analytics';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B1020] text-white font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<MatchPredictor />} />
            <Route path="/tournament" element={<TournamentSimulator />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
