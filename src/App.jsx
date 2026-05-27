import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import Mirror from './pages/Mirror';

const LandingPage = () => (
  <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
    <Navbar />
    <main className="pt-16">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mirror" element={<Mirror />} />
      </Routes>
    </Router>
  );
}

export default App;
