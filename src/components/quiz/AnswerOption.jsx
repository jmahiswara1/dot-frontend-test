import { motion } from 'framer-motion';

export default function AnswerOption({
  text,
  isSelected,
  isCorrect,
  showResult,
  onClick,
  disabled
}) {
  const getStyles = () => {
    if (!showResult) {
      return 'bg-white border-2 border-gray-200 hover:border-primary hover:shadow-soft';
    }

    if (isCorrect) {
      return 'bg-success border-2 border-success text-white shadow-soft';
    }

    if (isSelected && !isCorrect) {
      return 'bg-error border-2 border-error text-white shadow-soft';
    }

    return 'bg-gray-100 border-2 border-gray-200 opacity-50';
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-3 sm:p-4 rounded-lg text-left
        font-body font-medium break-words
        transition-all duration-200
        disabled:cursor-not-allowed
        ${getStyles()}
      `}
    >
      {text}
    </motion.button>
  );
}
