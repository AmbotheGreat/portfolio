import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/home'
import Projects from './components/projects'
import Skills from './components/skills'
import Contact from './components/contact'

// Navigation component for better separation of concerns
const Navigation = React.memo(({ location }) => {
  const navItems = useMemo(() => [
    { path: '/joshua-portfolio', icon: 'home', label: 'Home' },
    { path: '/projects', icon: 'projects', label: 'Projects' },
    { path: '/skills', icon: 'skills', label: 'Skills' },
    { path: '/contact', icon: 'contact', label: 'Contact' }
  ], []);

  const getIcon = useCallback((iconType) => {
    const icons = {
      home: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
      ),
      projects: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
      ),
      skills: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      contact: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
        </svg>
      )
    };
    return icons[iconType];
  }, []);

  return (
    <div
      id='navbar'
      className='w-1/10 h-2/5 mr-10 flex flex-col justify-center items-center rounded-lg'
      style={{
        background: 'linear-gradient(135deg, #000 0%, #fff 100%)'
      }}
    >
      {navItems.map(({ path, icon, label }) => (
        <Link 
          key={path}
          to={path} 
          className={`mb-5 p-1.5 rounded-full transition-colors duration-200 ${
            location.pathname === path 
              ? 'bg-black text-white' 
              : 'bg-white hover:bg-black hover:text-white'
          }`}
          aria-label={label}
        >
          {getIcon(icon)}
        </Link>
      ))}
    </div>
  );
});

Navigation.displayName = 'Navigation';

function App() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [slideDirection, setSlideDirection] = useState('');
  const [exitDirection, setExitDirection] = useState('');

  // Define route order for directional transitions
  const routeOrder = useMemo(() => ['/', '/projects', '/skills', '/contact'], []);

  useEffect(() => {
    if (location.pathname !== currentRoute) {
      const currentIndex = routeOrder.indexOf(currentRoute);
      const newIndex = routeOrder.indexOf(location.pathname);
      
      // Determine slide direction based on route order
      let direction = '';
      let exitDir = '';
      
      if (newIndex > currentIndex) {
        direction = 'slide-up';
        exitDir = 'exit-up';
      } else if (newIndex < currentIndex) {
        direction = 'slide-down';
        exitDir = 'exit-down';
      }
      
      setSlideDirection(direction);
      setExitDirection(exitDir);
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setCurrentRoute(location.pathname);
        setIsTransitioning(false);
        setSlideDirection('');
        setExitDirection('');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentRoute, routeOrder]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex relative" 
      style={{
        backgroundImage: 'url("bg.png")',
      }}
    >
      <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-black uppercase z-10 tracking-widest font-light">
        My Portfolio
      </h1>
      <div className='w-1/2 flex items-center justify-center'>
        <Navigation location={location} />
        <img 
          src="pic.jpeg" 
          alt="Portfolio profile" 
          className='w-3/4 h-auto object-cover'
          loading="eager"
        />
      </div>
      
      {/* Route Transition Container */}
      <div className={`route-transition-container ${isTransitioning ? 'transitioning' : ''} ${slideDirection} ${exitDirection}`}>
        <Routes location={location}>
          <Route path="/joshua-portfolio" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
