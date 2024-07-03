import easings from '@/lib/ui/easings';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
  animationKey: string;
  label: string;
  value: string | number;
  index?: number;
  className?: string;
};

const animationTransition = {
  duration: 0.75,
  delay: 0,
  ease: easings.OutQuad,
};

const animationVariants = {
  initial: {
    filter: 'blur(4px)',
    opacity: 0,
    transition: animationTransition,
  },
  animate: (custom: number) => ({
    filter: 'blur(0px)',
    opacity: 1,
    transition: { ...animationTransition, delay: custom * 0.1 },
  }),
  exit: { filter: 'blur(4px)', opacity: 0, transition: animationTransition },
};

export function AnimatedNumber({
  animationKey,
  label,
  value,
  index = 0,
  className,
}: Props) {
  return (
    <motion.div
      key={animationKey}
      custom={index}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      className={cn('flex justify-between px-4', className)}
    >
      <div>{label}</div>
      <div>€{value}</div>
    </motion.div>
  );
}
