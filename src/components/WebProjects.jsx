import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function WebProjects({ projects }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [active, setActive] = useState(0);
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

  return (
    <div>
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-7 gridContainerMargin mb-7">
        {/* LEFT COLUMN */}
        <div
          role="tablist"
          aria-label="Projects"
          className="relative col-span-full sm:col-span-1 sm:sticky sm:top-20 self-start"
        >
          {/* Black bar */}
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
        <div
          role="tabpanel"
          id={`project-panel-${active}`}
          aria-labelledby={`project-tab-${active}`}
          className="col-span-full sm:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-7"
        >
          <motion.div
            variants={content}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.3 }}
            className="bg-white relative flex flex-col h-full col-span-full sm:col-span-2 lg:col-span-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="subheadingBlack">{project.title}</h2>

                <img
                  src={project.thumb.src}
                  alt={`${project.title} project preview`}
                  width="800"
                  height="800"
                  loading="eager"
                  className="w-full aspect-square object-cover p-4 border-b-2 border-darkerGray"
                />

                <p className="p-4 text-black">{project.textShort}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="hidden sm:block lg:hidden"></div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={content}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.3 }}
            className=" relative flex flex-col min-h-[40dvh] col-span-full sm:col-span-2 lg:col-span-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title + "-details"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className=" bg-white flex relative flex-col min-h-[40dvh]"
              >
                <h2 className="subheadingBlack">Details</h2>

                <div className="flex flex-col gap-2 p-4">
                  <div className="flex justify-between border-b border-darkerGray pb-4">
                    <p className="font-bold uppercase">Type</p>
                    <p>{project.type}</p>
                  </div>

                  <div className="flex justify-between border-b border-darkerGray pb-4">
                    <p className="font-bold uppercase">Year</p>
                    <p>{project.year}</p>
                  </div>

                  <div className="flex justify-between border-b border-darkerGray pb-4">
                    <p className="font-bold uppercase ">Tools</p>
                    <p className="text-right">{project.tools}</p>
                  </div>
                </div>

                <div className="grow flex items-center justify-center pb-4">
                  <a
                    aria-label={`View ${project.title} project`}
                    href={project.href}
                    className="group relative overflow-hidden border border-black
                px-6 py-3 uppercase font-bold text-xl
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100 cursor-pointer flex items-center"
                  >
                    <span
                      className="relative z-10 flex items-center gap-3
                  transition-colors duration-300
                  text-black group-hover:text-white"
                    >
                      View Project{" "}
                      <Icon
                        icon="material-symbols:arrow-right"
                        className="text-2xl z-10 group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-4 gridContainerMargin mb-7 relative">
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
          {projects.map((project, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                variants={item}
                key={i}
                className="bg-white overflow-hidden"
              >
                {/* HEADER (clickable) */}
                <motion.button
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${i}`}
                  id={`accordion-header-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`group relative flex flex-row items-center justify-between bg-white w-full
                uppercase selectButtonSize text-left py-2 px-2
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100  cursor-pointer
                focus-visible:outline-2
focus-visible:outline-offset-2
                ${
                  isOpen
                    ? "before:scale-x-100 text-white"
                    : "text-black hover:text-white"
                }`}
                >
                  <h2 className="relative z-10 text-lg lg:text-xl">
                    {project.title}
                  </h2>
                  <Icon
                    icon="material-symbols:arrow-right"
                    className={`z-100  transition-all duration-300 
      text-4xl  ${isOpen ? "text-white -rotate-90" : "text-black rotate-90"}`}
                    aria-hidden="true"
                  />
                </motion.button>

                {/* CONTENT */}
                <div
                  id={`accordion-panel-${i}`}
                  role="region"
                  aria-labelledby={`accordion-header-${i}`}
                  inert={!isOpen ? "" : undefined}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <img
                    src={project.thumb.src}
                    alt={`${project.title} project preview`}
                    className="w-full aspect-square object-cover px-4 pb-4 border-b-2 border-darkerGray"
                  />

                  <p className="p-4 text-black">{project.textShort}</p>

                  {/* DETAILS */}
                  <div className="flex flex-col gap-2 px-4 pb-4">
                    <div className="flex justify-between border-b border-darkerGray pb-2">
                      <p className="font-bold uppercase">Type</p>
                      <p>{project.type}</p>
                    </div>

                    <div className="flex justify-between border-b border-darkerGray pb-2">
                      <p className="font-bold uppercase">Year</p>
                      <p>{project.year}</p>
                    </div>

                    <div className="flex justify-between border-b border-darkerGray pb-2">
                      <p className="font-bold uppercase">Tools</p>
                      <p className="text-right">{project.tools}</p>
                    </div>
                  </div>

                  <div className="flex justify-center pb-4">
                    <a
                      aria-label={`View ${project.title} project`}
                      href={project.href}
                      className="group relative overflow-hidden border border-black
                px-6 py-3 uppercase font-bold text-lg
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100 cursor-pointer flex items-center"
                    >
                      <span className="relative z-10 text-black group-hover:text-white transition-colors">
                        View Project
                      </span>
                      <Icon
                        icon="material-symbols:arrow-right"
                        className="text-2xl z-10 group-hover:text-white transition-colors"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
