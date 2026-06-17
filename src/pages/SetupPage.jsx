import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, BarChart3, Clock, ListChecks } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useQuizStore } from '../store/quizStore';
import { fetchQuestions } from '../services/api';
import { storage } from '../utils/storage';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import CustomDropdown from '../components/ui/CustomDropdown';

const CATEGORIES = [9, 10, 11, 12, 17, 18, 21, 22, 23, 24, 27];
const QUESTION_COUNTS = [5, 10, 15, 20];
const DIFFICULTIES = ['easy', 'medium', 'hard', 'mixed'];
const TIMER_OPTIONS = [3, 5, 10];

export default function SetupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username } = useAuthStore();
  const { config, setConfig, startQuiz, resumeFromStorage } = useQuizStore();
  const [hasResume, setHasResume] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      navigate('/');
      return;
    }

    const session = storage.getSession();
    if (session) {
      setHasResume(true);
    }
  }, [username, navigate]);

  const handleStart = async () => {
    setLoading(true);
    setError('');

    const result = await fetchQuestions({
      amount: config.totalQuestions,
      category: config.category,
      difficulty: config.difficulty
    });

    if (result.success) {
      startQuiz(result.questions);
      navigate('/quiz');
    } else {
      setError(t('common.retry'));
    }

    setLoading(false);
  };

  const handleResume = () => {
    if (resumeFromStorage()) {
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 relative flex flex-col items-center justify-center">
      {/* Clean background without gradients or glow */}

      <div className="absolute top-3 right-3 z-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-lg w-full relative z-10">
        <Card gradient className="!p-4">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-gray-800 mb-1">
            {t('setup.title')}
          </h1>
          <p className="font-body text-sm text-gray-600 mb-4">
            {t('setup.welcome', { name: username })}
          </p>

          <div className="space-y-3">
            {/* Total Questions */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5 font-body">
                <ListChecks className="w-3.5 h-3.5" />
                {t('setup.totalQuestions')}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {QUESTION_COUNTS.map(count => (
                  <button
                    key={count}
                    onClick={() => setConfig({ totalQuestions: count })}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-semibold transition-all
                      ${config.totalQuestions === count
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      font-body
                    `}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5 font-body">
                <Target className="w-3.5 h-3.5" />
                {t('setup.category')}
              </label>
              <CustomDropdown
                value={config.category || ''}
                onChange={(value) => setConfig({ category: value ? parseInt(value) : null })}
                options={[
                  { value: '', label: t('setup.allCategories') },
                  ...CATEGORIES.map(id => ({ value: String(id), label: t(`categories.${id}`) }))
                ]}
                placeholder={t('setup.allCategories')}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5 font-body">
                <BarChart3 className="w-3.5 h-3.5" />
                {t('setup.difficulty')}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {DIFFICULTIES.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setConfig({ difficulty: diff })}
                    className={`
                      py-2 px-3 rounded-lg text-xs font-semibold transition-all
                      ${config.difficulty === diff
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      font-body
                    `}
                  >
                    {t(`common.${diff}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5 font-body">
                <Clock className="w-3.5 h-3.5" />
                {t('setup.timer')}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TIMER_OPTIONS.map(mins => (
                  <button
                    key={mins}
                    onClick={() => setConfig({ timerDuration: mins * 60 })}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-semibold transition-all
                      ${config.timerDuration === mins * 60
                        ? 'bg-primary text-white shadow-soft'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      font-body
                    `}
                  >
                    {mins} {t('common.minutes')}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-body">
                {error}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <Button
                onClick={handleStart}
                variant="primary"
                size="md"
                className="w-full"
                disabled={loading}
              >
                {loading ? '...' : t('setup.start')}
              </Button>

              {hasResume && (
                <Button
                  onClick={handleResume}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  {t('setup.resume')}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
