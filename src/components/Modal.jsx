import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, projects, active, setActive }) {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };
  const directionRef = useRef(0);
  const touchStart = useRef(null);
  const next = () => {
    directionRef.current = 1;
    setActive((i) => (i + 1) % projects.length);
  };

  const prev = () => {
    directionRef.current = -1;
    setActive((i) => (i - 1 + projects.length) % projects.length);
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [[open, onClose, next, prev]]);

  if (typeof document === "undefined") return null;

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStart.current;

    if (diff > 50) prev();
    if (diff < -50) next();
  };
  const project = projects[active];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-lightGray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <div
            className="relative max-w-[85vw] max-h-[85vh] -translate-y-1/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence custom={directionRef.current} mode="wait">
              <motion.img
                key={active}
                src={project.image.src}
                custom={directionRef.current}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[85vw] max-h-[85vh] object-contain"
              />
            </AnimatePresence>
          </div>

          {/* Bottom panel */}
          <motion.div
            className="w-full absolute bottom-6 left-0"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="content flex flex-row bg-white items-center py-2 px-4 gap-8 justify-between sm:justify-start">
              <h3 className="uppercase text-lg font-bold">Fullscreen Mode</h3>
              <div className="flex flex-col sm:flex-row gap-2 ">
                <button
                  className="group relative overflow-hidden flex flex-row items-center uppercase font-light before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100 cursor-pointer pl-2 py-3 sm:py-0"
                  onClick={prev}
                >
                  <span
                    className="relative z-10 flex items-center
                  transition-colors duration-300
                  text-black group-hover:text-white"
                  >
                    Previous
                  </span>
                  <Icon
                    icon="material-symbols:arrow-left"
                    className="z-10 text-2xl stroke-current text-black group-hover:text-white transition-colors duration-300"
                  />
                </button>
                <button
                  className="group relative overflow-hidden flex flex-row items-center uppercase font-light before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100 cursor-pointer pl-2 py-3 sm:py-0"
                  onClick={next}
                >
                  <span
                    className="relative z-10 flex items-center
                  transition-colors duration-300
                  text-black group-hover:text-white"
                  >
                    Next
                  </span>

                  <Icon
                    icon="material-symbols:arrow-right"
                    className="z-10 text-2xl transition-colors duration-300
                  text-black group-hover:text-white"
                  />
                </button>
                <button
                  onClick={onClose}
                  className="group relative overflow-hidden flex flex-row items-center uppercase font-light before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100 cursor-pointer px-2 gap-2 py-3 sm:py-0"
                >
                  <span
                    className="relative z-10 flex items-center
                  transition-colors duration-300
                  text-black group-hover:text-white"
                  >
                    Exit
                  </span>

                  <span
                    className="z-10 text-lg font-bold transition-colors duration-300
                  text-black group-hover:text-white"
                  >
                    ✕
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
