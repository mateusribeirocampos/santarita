import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import News from './pages/News';
import Donate from './pages/Donate';
import ChurchSR from './pages/ChurchSR';
import SantaRita from './pages/SantaRita';
import './index.css';
import EventDetail from './pages/EventDetail.tsx';

function App() {
  return (
    <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
      <div className="min-h-screen flex flex-col bg-stone-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/eventos/:id" element={<EventDetail/>} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/news" element={<News />} />
            <Route path="/churchsr" element={<ChurchSR />} />
            <Route path="/santa-rita" element={<SantaRita />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;