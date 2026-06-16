import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function TimerBar({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Color based on time remaining
  const getBarColor = () => {
    if (timeLeft <= 10) return 'bg-error';
    if (timeLeft <= 30) return 'bg-warning';
    return 'bg-success';
  };

  // Pulse effect when < 30 seconds
  const shouldPulse = timeLeft <= 30 && timeLeft > 0;

  return (
    <div className="w-full space-y-2">
      {/* Time display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="font-body font-semibold text-gray-700">
            {timeString}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'linear' }}
          className={`
            h-full rounded-full
            ${getBarColor()}
            ${shouldPulse ? 'animate-pulse' : ''}
            transition-colors duration-500
          `}
        />
      </div>
    </div>
  );
}
