/**
 * Example component demonstrating animation utilities usage
 * This is a reference implementation showing best practices
 */

"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  getViewportAnimation,
  hoverScale,
  tapScale,
} from "@/lib/animations";

export function AnimatedSection() {
  return (
    <section className="py-16">
      {/* Simple fade in animation */}
      <motion.div
        {...getViewportAnimation(fadeInUp)}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold">Animated Section</h2>
        <p className="mt-4 text-gray-600">
          This section demonstrates various animation patterns
        </p>
      </motion.div>

      {/* Staggered list animation */}
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-2xl space-y-4"
      >
        {["First item", "Second item", "Third item", "Fourth item"].map(
          (item, index) => (
            <motion.li
              key={index}
              variants={staggerItem}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              {item}
            </motion.li>
          )
        )}
      </motion.ul>

      {/* Interactive button with hover and tap animations */}
      <div className="mt-12 text-center">
        <motion.button
          variants={hoverScale}
          initial="rest"
          whileHover="hover"
          whileTap={tapScale}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white"
        >
          Hover and Click Me
        </motion.button>
      </div>
    </section>
  );
}
