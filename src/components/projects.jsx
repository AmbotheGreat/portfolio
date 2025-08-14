import React, { useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import OptimizedImage from "./OptimizedImage";

// Memoized projects data
const projects = [
  {
    title: "JeepSieLog – Jeepney Travel Time Tracking System",
    description: "System that designed to track the travel time of jeepneys from point to point which is the waiting areas. The goal of JeepSieLog was to provide a tool that could help analyze the efficiency of public transportation, particularly jeepneys — a common mode of transportation in the Philippines. The system needed to monitor travel durations, identify waiting times at designated points, and visually represent these data points through a map interface.",
    images: [
      "joshua-portfolio/jeepsielog/1.png",
      "joshua-portfolio/jeepsielog/2.png",
      "joshua-portfolio/jeepsielog/3.png",
      "joshua-portfolio/jeepsielog/4.png",
      "joshua-portfolio/jeepsielog/5.png",
      "joshua-portfolio/jeepsielog/6.png",
      "joshua-portfolio/jeepsielog/7.png",
      "joshua-portfolio/jeepsielog/8.png"
    ],
    skills: ["React Js", "JavaScript (ES6+)", "CSS3", "Google Maps API", "Geolocation API"]
  },
  {
    title: "NIA Employee Documents Management",
    description: "The NIA Employee Documents Management system is designed to securely store, organize, and manage employee documents and records for the National Irrigation Administrations, providing a centralized platform for document handling, access control, and automated workflows.",
    images: [
      "joshua-portfolio/nia/1.png",
      "joshua-portfolio/nia/2.png",
      "joshua-portfolio/nia/3.png",
      "joshua-portfolio/nia/4.png",
      "joshua-portfolio/nia/5.png",
      "joshua-portfolio/nia/6.png",
      "joshua-portfolio/nia/7.png",
      "joshua-portfolio/nia/8.png",
      "joshua-portfolio/nia/9.png"
    ],
    skills: ["React Js", "JavaScript (ES6+)", "TailwindCSS", "Node.js", "Express.js", "MariaDB"]
  },
  {
    title: "Fluiguard - Sustainable Hybrid Control of Water Aeration System for Aquaponics with Real-time Tilapia Behavior Monitoring",
    description: "This project aims to design and implement a Sustainable Hybrid Control System for water aeration in aquaponics that integrates real-time monitoring of tilapia behavior to optimize oxygenation levels. The system addresses the critical balance between sustainability, fish welfare, and energy efficiency in aquaponics operations. By using smart sensors, microcontrollers, and machine learning-based behavior analysis, the system dynamically adjusts aeration based on water quality parameters (such as dissolved oxygen and temperature) and observed fish activity. This hybrid approach combines automated control and behavior-driven decision-making, ensuring that oxygen levels are optimal without unnecessary energy consumption.",
    images: [
      "joshua-portfolio/fluiguard/1.png",
      "joshua-portfolio/fluiguard/2.png",
      "joshua-portfolio/fluiguard/3.png",
      "joshua-portfolio/fluiguard/4.png",
      "joshua-portfolio/fluiguard/5.png",
      "joshua-portfolio/fluiguard/6.png",
      "joshua-portfolio/fluiguard/7.png",
      "joshua-portfolio/fluiguard/8.png",
      "joshua-portfolio/fluiguard/9.png",
      "joshua-portfolio/fluiguard/10.png"
    ],
    skills: ["Python", "Raspberry", "IoT", "Machine Learning", "Data Analysis", "Hardware Integration"]
  },
];

// Project Modal Component
const ProjectModal = React.memo(({ project, onClose }) => {
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Use portal to render modal outside component hierarchy
  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white shadow-2xl rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="p-8">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">{project.title}</h3>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/5">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Project Description:</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Skills and Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Project Preview:</h4>
              <div className="space-y-4">
                {project.images.map((image, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-2">
                    <OptimizedImage
                      src={image}
                      alt={`${project.title} - Screenshot ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-lg shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
});

ProjectModal.displayName = 'ProjectModal';

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const length = projects.length;
  const currentProject = useMemo(() => projects[current], [current]);

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }, [current, length]);

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }, [current, length]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <div className="route-center-content flex flex-col items-center justify-center w-1/2 pr-10">
      <h2 className="text-4xl font-thin text-center mb-6 w-full uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>
        My <span className='text-red-500 font-thin' style={{ fontWeight: 200 }}>Projects</span>
      </h2>
      <div className="relative w-full">
        {/* Carousel Card */}
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-500 h-80 relative overflow-hidden cursor-pointer group"
          onClick={openModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openModal();
            }
          }}
        >
          {/* Image Layer */}
          <div 
            className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-300 z-0" 
            style={{
              backgroundImage: `url(${currentProject.images[0]})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              filter: 'none'
            }} 
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />
        </div>
        
        {/* Title and Description with slider arrows in one row below the card */}
        <div className="flex items-center justify-center mt-4 mb-2 w-full">
          <button
            onClick={prevSlide}
            className="bg-black hover:bg-gray-500 hover:text-black text-white rounded-full p-2 shadow-md mr-4 transition-colors duration-200"
            aria-label="Previous project"
          >
            &#8592;
          </button>
          <div className="flex flex-col items-center flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{currentProject.title}</h3>
          </div>
          <button
            onClick={nextSlide}
            className="bg-black hover:bg-gray-500 hover:text-black text-white rounded-full p-2 shadow-md ml-4 transition-colors duration-200"
            aria-label="Next project"
          >
            &#8594;
          </button>
        </div>
        
        {/* Indicators below the row */}
        <div className="flex items-center justify-center mb-2 space-x-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                current === idx ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        {showModal && (
          <ProjectModal 
            project={currentProject} 
            onClose={closeModal} 
          />
        )}
      </div>
    </div>
  );
}