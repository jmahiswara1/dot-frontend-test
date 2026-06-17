import { motion } from 'framer-motion';

export default function CircularProgress({ percentage, size = 200, strokeWidth = 12, className = '' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 80) return '#10B981'; // success
    if (percentage >= 60) return '#108542'; // primary
    if (percentage >= 40) return '#F59E0B'; // warning
    return '#EF4444'; // error
  };

  return (
    <div className={`relative inline-flex items-center justify-center w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] ${className}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDasharray, strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="font-display font-bold text-3xl sm:text-5xl text-gray-800">
            {percentage}%
          </div>
          <div className="font-body text-xs sm:text-sm text-gray-500 mt-1">
            Score
          </div>
        </motion.div>
      </div>
    </div>
  );
}
