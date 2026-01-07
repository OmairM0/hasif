"use client";
// import * as motion from "motion/react-client";
import { motion } from "motion/react";
import Button from "./ui/button";

const MotionButton = motion.create(Button);

const AnimatedCom = () => {
  return (
    <div className="flex justify-center items-center mt-4 ">
      <motion.ul
        drag
        whileDrag={{ scale: 0.9, rotate: 180 }}
        dragSnapToOrigin
        animate={{ rotate: 360, transition: { duration: 2 } }}
        className="w-12 h-12 bg-indigo-500 rounded-md"
      />
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 bg-green-400 mx-4 flex justify-center items-center rounded-md text-2xl"
      >
        {"😋"}
      </motion.div>
      <MotionButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        Click me
      </MotionButton>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-pink-400"
      />
    </div>
  );
};

export default AnimatedCom;
