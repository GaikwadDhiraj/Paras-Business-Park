import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Amenities } from './components/Amenities';
import { SitePlans } from './components/SitePlans';
import { Location } from './components/Location';
import { Contact } from './components/Contact';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

function LandingPage() {
  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Gallery />
      <Amenities />
      <SitePlans />
      <Location />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
