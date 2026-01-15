import { useCounterAnimation } from '@/hooks/use-counter-animation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ 
  end, 
  suffix = '', 
  prefix = '',
  duration = 2000,
  className = ''
}: AnimatedCounterProps) => {
  const { ref, displayValue } = useCounterAnimation({
    end,
    duration,
    suffix,
    prefix
  });

  return (
    <div ref={ref} className={className}>
      {displayValue}
    </div>
  );
};

export default AnimatedCounter;
