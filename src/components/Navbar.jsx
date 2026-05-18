import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../constants";
import { Icon } from "@iconify/react";
import "../styles/global.css";
import { FocusTrap } from "focus-trap-react";

export default function Navbar({ pathname }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Prevent background scroll
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeMenu();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.inert = !isOpen;
    }
  }, [isOpen]);

  return (
    <FocusTrap active={isOpen}>
      <div>
        {/* NAVBAR */}
        <header className="w-full border-b border-black fixed z-50 bg-lightGray">
          <div className="content flex items-center justify-between h-16 gap-3 z-100 relative">
            {/* Desktop */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex w-full h-full"
            >
              <ul className="lg:flex items-center justify-between gap-3 w-full h-full">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname.startsWith(link.href + "/");

                  return (
                    <li key={link.href} className="h-full flex-1">
                      <a
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`group relative w-full justify-start flex items-center gap-2 px-2 py-1 uppercase transition-all duration-300
                  
                  before:absolute before:inset-0 before:bg-black
                  before:origin-left before:scale-x-0
                  before:transition-transform before:duration-300 h-full
                  
                  hover:before:scale-x-100 hover:text-white
                  
                  ${
                    isActive
                      ? "text-white before:scale-x-100 h-full"
                      : "text-black bg-white"
                  }
                `}
                      >
                        <Icon
                          icon="material-symbols:arrow-right"
                          aria-hidden="true"
                          className={`absolute rotate-90 bottom-1/2 translate-y-full left-0 right-0 mx-auto
      text-7xl text-black ${isActive ? "opacity-100" : "opacity-0"}`}
                        />

                        <span className="relative z-10 flex items-center gap-2">
                          <Icon aria-hidden="true" icon={link.icon} />
                          {link.name}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Logo */}
            <a
              href="/"
              aria-label="Home page"
              className="block lg:hidden text-2xl  z-15 text-center text-black"
            >
              <span className="font-decorative text-[2.2rem]  ">A</span>
              dam
              <span className="inline-block text-black">
                <span className="font-decorative text-[2.2rem] tracking-tight ">
                  K
                </span>
                aščák
              </span>
            </a>

            {/* Hamburger */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 flex items-center justify-center relative"
            >
              <div className="w-6 h-5 relative">
                <span
                  className={`absolute w-full h-[2px] bg-black transition-all duration-300 ${
                    isOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                />
                <span
                  className={`absolute w-full h-[2px] bg-black top-2 transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute w-full h-[2px] bg-black transition-all duration-300 ${
                    isOpen ? "-rotate-45 bottom-2" : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </header>

        {/* Overlay */}
        <div
          onClick={closeMenu}
          className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
    
        `}
          aria-hidden="true"
        />

        {/* Mobile Drawer */}

        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          aria-hidden={!isOpen}
          className={`fixed block lg:hidden top-6 left-0 h-full w-full max-w-[300px] bg-lightGray z-30
          transition-transform duration-300 ease-out shadow-xl motion-reduce:transition-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <nav aria-label="Mobile navigation" className=" mt-16 ">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(link.href + "/");

                return (
                  <li key={link.href} className="w-full h-full">
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        closeMenu();

                        setTimeout(() => {
                          window.location.href = link.href;
                        }, 200); // match your animation duration
                      }}
                      className={`group relative flex items-center px-3 py-4  uppercase text-lg
                bg-white w-full h-full
                
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                
                hover:before:scale-x-100 hover:text-white
                
               
                ${isActive ? "text-white before:scale-x-100" : "text-black"}
              `}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Icon aria-hidden="true" icon={link.icon} />
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </FocusTrap>
  );
}
