"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  value: number;
  duration?: number;
  delay?: number;
  formatPrefix?: string;
}

export function AnimatedNumber({ value, duration = 2000, delay = 0, formatPrefix = "" }: Props) {
  const [isClient, setIsClient] = useState(false);
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 25,
  });

  const display = useTransform(spring, (current) => {
    const formatted = Math.round(current).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    return `${formatPrefix}${formatted}`;
  });

  useEffect(() => {
    setIsClient(true);
    const timeout = setTimeout(() => {
      spring.set(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [spring, value, delay]);

  if (!isClient) {
    return <span>{formatPrefix}{value.toLocaleString()}</span>;
  }

  return <motion.span>{display}</motion.span>;
}
