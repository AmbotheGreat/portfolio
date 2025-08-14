import React from "react";

export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        "React.js",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "TailwindCSS"
      ]
    },
    {
      category: "Backend Development",
      skills: [
        "Node.js",
        "Express.js",
        "Php",
        "Laravel",
        "MariaDB"
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        "Git & GitHub",
        "RESTful APIs",
        "Google Maps API",
        "IoT & Raspberry Pi",
        "Machine Learning"
      ]
    }
  ];

  return (
    <div className='route-center-content w-1/2 flex flex-col justify-center relative p-5'>
      <h2 className="text-4xl font-thin text-center mb-6 w-full uppercase" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>
        My <span className='text-red-500 font-thin' style={{ fontWeight: 200 }}>skills</span>
      </h2>
      <p className='bg-black text-white w-4/5 p-2 opacity-60 mb-6'>
        Here are the technologies and tools I've worked with throughout my journey as a web developer.
      </p>
      
      <div className='space-y-2'>
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4'>
            <h3 className='text-xl font-semibold text-black mb-2'>{category.category}</h3>
            <div className='flex flex-wrap gap-2'>
              {category.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex}
                  className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 