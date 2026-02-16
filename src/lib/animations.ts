/**
 * Animation utilities and variants for Framer Motion
 * Implements subtle animations that respect user preferences and performance
 * Requirements: 10.1, 10.3, 10.5
 */

import { Variants, Transition } from "framer-motion";

/**
 * Default transition configuration
 * Uses spring physics for natural motion
 */
export const defaultTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.5,
};

/**
 * Reduced motion transition
 * Instant transitions for users who prefer reduced motion
 */
export const reducedMotionTransition: Transition = {
  duration: 0.01,
};

/**
 * Fade in animation variant
 * Subtle opacity transition for elements entering viewport
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

/**
 * Fade in up animation variant
 * Combines opacity with upward movement
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * Fade in down animation variant
 * Combines opacity with downward movement
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * Slide in from left animation variant
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

/**
 * Slide in from right animation variant
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

/**
 * Scale in animation variant
 * Subtle scale effect for emphasis
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

/**
 * Stagger children animation variant
 * For animating lists or groups of elements
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger item variant
 * Used with staggerContainer for child elements
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

/**
 * Utility function to get viewport animation props
 * Automatically triggers animation when element enters viewport
 * Respects prefers-reduced-motion setting
 *
 * @param variant - The animation variant to use
 * @param once - Whether to animate only once (default: true)
 * @param amount - How much of the element should be visible before animating (default: 0.3)
 * @returns Props to spread on motion component
 */
export function getViewportAnimation(
  variant: Variants = fadeInUp,
  once: boolean = true,
  amount: number = 0.3
) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once, amount },
    variants: variant,
  };
}

/**
 * Utility function to check if user prefers reduced motion
 * Can be used to conditionally disable animations
 *
 * @returns boolean indicating if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Utility function to get animation props with reduced motion support
 * Returns no animation if user prefers reduced motion
 *
 * @param variant - The animation variant to use
 * @returns Props to spread on motion component
 */
export function getAccessibleAnimation(variant: Variants = fadeInUp) {
  if (prefersReducedMotion()) {
    return {
      initial: "visible",
      animate: "visible",
      variants: variant,
    };
  }

  return {
    initial: "hidden",
    animate: "visible",
    variants: variant,
  };
}

/**
 * Hover animation variants
 * Subtle scale and lift effect for interactive elements
 */
export const hoverScale: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

/**
 * Hover lift animation
 * Subtle upward movement for cards and buttons
 */
export const hoverLift: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

/**
 * Tap animation for buttons
 * Subtle scale down on press
 */
export const tapScale = {
  scale: 0.98,
};

/**
 * Page transition variants
 * For smooth page transitions
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

/**
 * Utility to create custom stagger animation
 *
 * @param staggerDelay - Delay between each child animation (default: 0.1)
 * @param delayChildren - Initial delay before children start animating (default: 0)
 * @returns Variants object for stagger container
 */
export function createStaggerContainer(
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

/**
 * Utility to create custom fade animation with configurable distance
 *
 * @param distance - Distance to move (default: 20)
 * @param direction - Direction to move: 'up' | 'down' | 'left' | 'right' (default: 'up')
 * @returns Variants object for fade animation
 */
export function createFadeAnimation(
  distance: number = 20,
  direction: "up" | "down" | "left" | "right" = "up"
): Variants {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: defaultTransition,
    },
  };
}
