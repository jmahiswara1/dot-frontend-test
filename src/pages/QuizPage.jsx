import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { useTimer } from '../hooks/useTimer';
import Card from '../components/ui/Card';
import TimerBar from '../components/ui/TimerBar';
import ProgressBar from '../components/ui/ProgressBar';
import AnswerOption from '../components/quiz/AnswerOption';

export default function QuizPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { timeRemaining } = useTimer();
  const {
    questions,
    currentIndex,
    answers,
    config,
    status,
    selectAnswer,
    nextQuestion
  } = useQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (status !== 'playing') {
      navigate('/result');
      return;
    }

    if (questions.length === 0) {
      navigate('/setup');
      return;
    }
  }, [status, questions, navigate]);

  useEffect(() => {
    if (timeRemaining === 0 && status === 'playing') {
      navigate('/result');
    }
  }, [timeRemaining, status, navigate]);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentIndex]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);
    selectAnswer(currentIndex, answer);

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Mobile: inline stacked header */}
      <div className="sm:hidden sticky top-0 z-20 bg-white border-b border-gray-100 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <TimerBar
            timeLeft={timeRemaining}
            totalTime={config.timerDuration}
          />
        </div>
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
        />
      </div>

      {/* Desktop: fixed timer left + progress center */}
      <div className="hidden sm:block">
        <div className="fixed top-4 left-4 z-20 w-48">
          <TimerBar
            timeLeft={timeRemaining}
            totalTime={config.timerDuration}
          />
        </div>
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-3xl px-4">
          <ProgressBar
            current={currentIndex + 1}
            total={questions.length}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 pb-8 pt-4 sm:pt-24 relative z-10">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card gradient>
              <div className="mb-4 sm:mb-6">
                <p className="font-body text-sm text-gray-500 mb-2">
                  {t('quiz.question')} {currentIndex + 1} {t('quiz.of')} {questions.length}
                </p>
                <h2 className="font-display text-lg sm:text-2xl font-bold text-gray-800">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {currentQuestion.allAnswers.map((answer, index) => (
                  <AnswerOption
                    key={index}
                    text={answer}
                    isSelected={selectedAnswer === answer}
                    isCorrect={answer === currentQuestion.correct_answer}
                    showResult={showResult}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={showResult}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
