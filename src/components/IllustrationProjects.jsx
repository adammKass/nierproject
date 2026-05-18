import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { Icon } from "@iconify/react";

export default function IllustrationProjects({ projects }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const project = projects[active];
  const tabRefs = useRef([]);
  const handleKeyDown = (e, index) => {
    let nextIndex = index;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = (index + 1) % projects.length;
        break;

      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = (index - 1 + projects.length) % projects.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = projects.length - 1;
        break;

      default:
        return;
    }

    e.preventDefault();

    setActive(nextIndex);

    tabRefs.current[nextIndex]?.focus();
  };

  // 🔹 Animation variants
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const content = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div>
      <div className=" relative sm:hidden flex flex-col h-full col-span-full sm:col-span-2 gridContainerMargin">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ originY: 0.5 }}
          className="absolute left-0 top-0 w-[2px] h-full bg-black"
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2 pl-6"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={item}
              className="bg-white"
            >
              <h2 className="subheadingBlack">{project.title}</h2>
              <div
                className="w-full h-fit flex items-center justify-center p-4 relative group cursor-pointer"
                onClick={() => setFullscreen(true)}
              >
                <img
                  src={project.image.src}
                  className="max-w-full max-h-full object-contain"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  {/* fullscreen icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-3xl">
                    ⤢
                  </div>
                </div>
              </div>

              <p className="p-4 text-darkestGray">{project.textShort}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="hidden sm:grid grid-cols-3 gap-7 gridContainerMargin mb-7">
        {/* LEFT COLUMN */}
        <div
          role="tablist"
          aria-label="Illustrations projects"
          className="relative col-span-full sm:col-span-1 sm:sticky sm:top-20 self-start"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originY: 0.5 }}
            className="absolute left-0 top-0 w-[2px] h-full bg-black"
          />
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 pl-6"
          >
            {projects.map((p, i) => (
              <motion.button
                ref={(el) => (tabRefs.current[i] = el)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                key={i}
                variants={item}
                role="tab"
                aria-selected={active === i}
                aria-controls={`project-panel-${i}`}
                id={`project-tab-${i}`}
                tabIndex={active === i ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative bg-white
                uppercase selectButtonSize text-left py-2 px-2
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100
                ${
                  active === i
                    ? "before:scale-x-100 text-white"
                    : "text-black hover:text-white"
                }`}
              >
                <Icon
                  aria-hidden="true"
                  icon="material-symbols:arrow-right"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full
      text-4xl text-black ${active === i ? "opacity-100" : "opacity-0"}`}
                />
                <span className="relative z-10">{p.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* MIDDLE COLUMN */}
        <motion.div
          role="tabpanel"
          id={`project-panel-${active}`}
          aria-labelledby={`project-tab-${active}`}
          variants={content}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-white relative flex flex-col h-full col-span-full sm:col-span-2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              <h2 className="subheadingBlack">{project.title}</h2>

              <div className="flex flex-col flex-1 justify-between">
                <button
                  aria-label={`View ${project.title} in fullscreen`}
                  className="w-full h-[60dvh] flex items-center justify-center p-4 relative group cursor-pointer"
                  onClick={() => setFullscreen(true)}
                >
                  <img
                    src={project.image.src}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain"
                  />

                  {/* dark overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-3xl">
                      ⤢
                    </div>
                  </div>
                </button>

                <p className="p-4 text-darkestGray">{project.textShort}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <Modal
          open={fullscreen}
          onClose={() => setFullscreen(false)}
          projects={projects}
          active={active}
          setActive={setActive}
        ></Modal>
      </div>
    </div>
  );
}
