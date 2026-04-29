import { useState, useEffect } from "react";
import { NAV_LINKS } from "../constants";
import { Icon } from "@iconify/react";
import "../styles/global.css";

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

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full border-b border-black fixed z-50 bg-lightGray">
        <nav className="content flex items-center justify-between h-16 gap-3 z-100 relative">
          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-3 w-full h-full">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative flex items-center w-48 gap-2 px-2 py-1 uppercase transition-all duration-300
                  
                  before:absolute before:inset-0 before:bg-black
                  before:origin-left before:scale-x-0
                  before:transition-transform before:duration-300
                  
                  hover:before:scale-x-100 hover:text-white
                  
                  ${
                    (
                      link.href === "/"
                        ? pathname === "/"
                        : pathname === link.href ||
                          pathname.startsWith(link.href + "/")
                    )
                      ? "text-white before:scale-x-100 h-full"
                      : "text-black bg-white"
                  }
                `}
              >
                <Icon
                  icon="material-symbols:arrow-right"
                  className={`absolute rotate-90 bottom-1/2 translate-y-full left-0 right-0 mx-auto
      text-7xl text-black ${
        (
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(link.href + "/")
        )
          ? "opacity-100"
          : "opacity-0"
      }`}
                />

                <span className="relative z-10 flex items-center gap-2">
                  <Icon icon={link.icon} />
                  {link.name}
                </span>
              </a>
            ))}
          </div>
          {/* Logo */}
          <a href="/" class="block lg:hidden text-2xl  z-15 text-center">
            <span class="font-decorative text-[2.2rem]  ">A</span>
            dam
            <span class="inline-block text-black">
              <span class="font-decorative text-[2.2rem] tracking-tight ">
                K
              </span>
              aščák
            </span>
          </a>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
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
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 h-full w-full max-w-[300px] bg-lightGray z-30
          transition-transform duration-300 ease-out shadow-xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-4 mt-16">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                closeMenu();

                setTimeout(() => {
                  window.location.href = link.href;
                }, 200); // match your animation duration
              }}
              className={`relative px-4 py-3 uppercase text-lg
                bg-white
                
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                
                hover:before:scale-x-100 hover:text-white
                
                ${
                  pathname === link.href
                    ? "text-white before:scale-x-100"
                    : "text-black"
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Icon icon={link.icon} />
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
