import { useState } from "react";
import { FAQ_LINKS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ServicesProjects({ projects }) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const project = projects[active];

  const [question, setQuestion] = useState(null);

  const toggle = (i) => {
    setQuestion(question === i ? null : i);
  };

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
      <div className="md:hidden flex flex-col gap-4 gridContainerMargin mb-7 relative">
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
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`group relative flex flex-row items-center justify-between bg-white w-full
                uppercase selectButtonSize text-left py-2 px-2
                before:absolute before:inset-0 before:bg-black
                before:origin-left before:scale-x-0
                before:transition-transform before:duration-300
                hover:before:scale-x-100  cursor-pointer
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
                  />
                </motion.button>

                {/* CONTENT */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="w-full aspect-video flex items-center justify-center">
                    <Icon icon={project.icon} className={`text-[162px]`} />
                  </div>

                  <p className="p-4 text-darkestGray">{project.about}</p>
                  <p className="px-4 py-2 lg:py-4 text-black uppercase font-bold">
                    {project.areas}
                  </p>
                </div>
              </motion.div>
            );
          })}
          <motion.div
            key={"-details"}
            variants={item}
            className=" bg-white flex relative flex-col min-h-[40dvh] mt-10"
          >
            <h2 className="subheadingBlack text-lg lg:text-xl">FAQ</h2>

            <div className="flex flex-col p-4">
              {FAQ_LINKS.map((link, i) => {
                const isQuestion = question === i;

                return (
                  <div key={i} className="border-b border-gray-300">
                    {/* QUESTION */}
                    <button
                      onClick={() => toggle(i)}
                      className={`cursor-pointer w-full flex items-center justify-between px-3 py-2 transition-colors duration-300 
                ${
                  isQuestion
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                    >
                      <span className="font-bold text-base text-left lg:text-lg ">
                        {link.question}
                      </span>

                      <Icon
                        icon="material-symbols:arrow-drop-down"
                        className={`text-2xl transition-transform duration-300
                  ${isQuestion ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    {/* ANSWER */}
                    <div
                      className={`grid transition-all duration-300 text-sm lg:text-base
                ${isQuestion ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden px-3">
                        <p className="text-darkestGray">{link.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-7 gridContainerMargin">
        {/* LEFT COLUMN */}
        <div className="relative col-span-full md:col-span-1 md:sticky md:top-20 self-start">
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
                key={i}
                variants={item}
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
          variants={content}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.3 }}
          className="bg-white relative flex flex-col h-fit col-span-full md:col-span-2 lg:col-span-1"
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
              <div className="w-full aspect-video flex items-center justify-center">
                <Icon icon={project.icon} className={`text-[162px]`} />
              </div>

              <p className="p-4 text-darkestGray">{project.about}</p>
              <p className="px-4 py-2 lg:py-4 text-black uppercase font-bold">
                {project.areas}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="hidden md:block lg:hidden"></div>

        {/* RIGHT COLUMN */}
        <motion.div
          variants={content}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-white relative flex flex-col min-h-[40dvh] col-span-full md:col-span-2 lg:col-span-1 mb-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={"-details"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className=" bg-white flex relative flex-col min-h-[40dvh]"
            >
              <h2 className="subheadingBlack">FAQ</h2>

              <div className="flex flex-col p-4">
                {FAQ_LINKS.map((link, i) => {
                  const isQuestion = question === i;

                  return (
                    <div key={i} className="border-b border-gray-300">
                      {/* QUESTION */}
                      <button
                        onClick={() => toggle(i)}
                        className={`cursor-pointer w-full flex items-center justify-between px-3 py-2 transition-colors duration-300 
                ${
                  isQuestion
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                      >
                        <span className="font-bold text-base text-left lg:text-lg ">
                          {link.question}
                        </span>

                        <Icon
                          icon="material-symbols:arrow-drop-down"
                          className={`text-2xl transition-transform duration-300
                  ${isQuestion ? "rotate-180" : "rotate-0"}`}
                        />
                      </button>

                      {/* ANSWER */}
                      <div
                        className={`grid transition-all duration-300 text-sm lg:text-base
                ${isQuestion ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"}`}
                      >
                        <div className="overflow-hidden px-3">
                          <p className="text-darkestGray">{link.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
