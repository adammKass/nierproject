import { motion } from "framer-motion";

export default function AnimatedColumn({ children }) {
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

  return (
    <div className="relative col-span-full sm:col-span-6 z-30 md:sticky md:top-20 self-start">
      {/* Black bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ originY: 0.5 }}
        className="absolute left-0 top-0 w-[2px] h-full bg-black"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col gap-2 pl-6"
      >
        {Array.isArray(children) ? (
          children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={item}>{children}</motion.div>
        )}
      </motion.div>
    </div>
  );
}
