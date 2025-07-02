import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import News from "./pages/News";
import Tithe from "./pages/Tithe.tsx";
import ChurchSR from "./pages/ChurchSR";
import SantaRita from "./pages/SantaRita";
import Success from "./pages/Success.tsx";
import "./index.css";
import EventDetail from "./pages/EventDetail.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-stone-50">
          <Routes>
            {/* Login route (no navbar/footer) */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin route (protected, no navbar/footer) */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            
            {/* Public routes with navbar/footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/eventos/:id" element={<EventDetail />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/churchsr" element={<ChurchSR />} />
                    <Route path="/santa-rita" element={<SantaRita />} />
                    <Route path="/tithe" element={<Tithe />} />
                    <Route path="/success" element={<Success />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
