import React, { useMemo } from "react";
import TypewriterText from "./TypewriterText";

// Social Media Button Component
const SocialButton = React.memo(({ href, onClick, bgColor, icon, label }) => {
  const buttonProps = href 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick, type: "button" };

  return (
    <a
      {...buttonProps}
      className="inline-block rounded mr-2 px-3 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
      style={{ backgroundColor: bgColor }}
      aria-label={label}
    >
      {icon}
    </a>
  );
});

SocialButton.displayName = 'SocialButton';

export default function Home(){
    // Memoize the typewriter text array to prevent unnecessary re-renders
    const typewriterTexts = useMemo(() => [
      ["An aspiring ", <span key="aspiring" className='text-red-500 font-bold'>Web Developer</span>],
      ["A passionate ", <span key="passionate" className='text-red-500 font-bold'>Web Developer</span>],
      ["A growing ", <span key="growing" className='text-red-500 font-bold'>Web Developer</span>],
      ["A modern ", <span key="modern" className='text-red-500 font-bold'>Web Developer</span>]
    ], []);

    // Memoize social media buttons
    const socialButtons = useMemo(() => [
      {
        href: "/resume.pdf",
        bgColor: "#3b82f6",
        icon: "Download CV",
        label: "Download CV"
      },
      {
        onClick: () => window.open("https://www.facebook.com/joshua.linaii", "_blank"),
        bgColor: "#1877f2",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        ),
        label: "Facebook"
      },
      {
        href: "mailto:lina.joshuacruz@gmail.com",
        bgColor: "#ea4335",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        ),
        label: "Email"
      },
      {
        onClick: () => window.open("https://github.com/AmbotheGreat", "_blank"),
        bgColor: "#333",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        ),
        label: "GitHub"
      }
    ], []);

    return(
        <div className='w-1/2 flex flex-col justify-center relative pl-10'>
          <h1 className='text-7xl flex flex-row items-center mb-2'>
              <span className='bg-yellow-400 px-3 rounded-lg'>Hi! I am</span>
              <span className='text-blue-600 text-[12rem] absolute right-20 pt-8' style={{ fontFamily: 'Malibu, sans-serif' }}> Joshua</span>
          </h1>
          <h2 className='text-4xl py-2'>
            <TypewriterText
              text={typewriterTexts}
              speed={70}
              cursor
              loop={true}
              delay={2000}
            />
          </h2>
          <p className='bg-black text-white w-4/5 p-2 opacity-60'>
            I am a fresh graduate in Information Technology with a strong passion for coding 
            and continuous learning. I may be just starting my journey, but I'm determined to
             grow every day and become a skilled and successful Web Developer in the 
             future.
          </p>
          <h3 className='opacity-60 py-2'>Want to connect with me? Email me or follow me on.</h3>
          <div className='flex flex-row items-center'>
            {socialButtons.map((button, index) => (
              <SocialButton
                key={index}
                href={button.href}
                onClick={button.onClick}
                bgColor={button.bgColor}
                icon={button.icon}
                label={button.label}
              />
            ))}
          </div>
        </div>
    )
}