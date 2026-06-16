import { motion } from 'framer-motion';

export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      {/* Question counter */}
      <div className="flex items-center justify-between">
        <span className="font-body font-semibold text-gray-700">
          Question {current} of {total}
        </span>
        <span className="font-body text-sm text-gray-500">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
