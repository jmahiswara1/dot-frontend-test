import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, SkipForward } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import CircularProgress from '../components/ui/CircularProgress';

export default function ResultPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    questions,
    answers,
    correctAnswers,
    wrongAnswers,
    skippedAnswers,
    clearStorage
  } = useQuizStore();

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/setup');
    }
  }, [questions, navigate]);

  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage === 100) return t('result.perfect');
    if (percentage >= 80) return t('result.great');
    if (percentage >= 60) return t('result.goodTry');
    return t('result.keepPracticing');
  };

  const { logout } = useAuthStore();

  const handlePlayAgain = () => {
    clearStorage();
    navigate('/setup');
  };

  const handleChangePlayer = () => {
    clearStorage();
    logout();
    navigate('/login');
  };

  const showConfetti = percentage >= 70;

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              initial={{ y: -10, opacity: 1 }}
              animate={{
                y: '100vh',
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-3xl mx-auto pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card gradient>
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl font-bold text-gray-800 mb-4">
                {t('result.title')}
              </h1>
              <p className="font-body text-2xl font-semibold text-primary mb-6">
                {getGrade()}
              </p>

              <div className="flex justify-center mb-8">
                <CircularProgress percentage={percentage} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-600 mb-1">{t('result.correct')}</p>
                  <p className="font-display text-3xl font-bold text-success">{correctAnswers}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <XCircle className="w-8 h-8 text-error mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-600 mb-1">{t('result.wrong')}</p>
                  <p className="font-display text-3xl font-bold text-error">{wrongAnswers}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <SkipForward className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-600 mb-1">{t('result.skipped')}</p>
                  <p className="font-display text-3xl font-bold text-gray-500">{skippedAnswers}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-gray-800 mb-4">Review</h3>
              {questions.map((q, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === q.correct_answer;
                const wasSkipped = !userAnswer;

                return (
                  <div
                    key={index}
                    className={`
                      p-4 rounded-lg border-2
                      ${wasSkipped
                        ? 'border-gray-300 bg-gray-50'
                        : isCorrect
                        ? 'border-success bg-green-50'
                        : 'border-error bg-red-50'
                      }
                    `}
                  >
                    <p className="font-body font-medium text-gray-800 mb-2">
                      {index + 1}. {q.question}
                    </p>
                    {!wasSkipped && (
                      <p className={`font-body text-sm mb-1 ${isCorrect ? 'text-success' : 'text-error'}`}>
                        Your answer: {userAnswer}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="font-body text-sm text-success">
                        Correct: {q.correct_answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-8">
              <Button onClick={handlePlayAgain} variant="primary" size="lg" className="flex-1">
                {t('result.playAgain')}
              </Button>
              <Button onClick={handleChangePlayer} variant="outline" size="lg" className="flex-1">
                {t('result.changePlayer')}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
