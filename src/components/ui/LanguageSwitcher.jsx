import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useAuthStore();

  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        relative inline-flex items-center gap-1.5 sm:gap-2
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
        bg-white border border-gray-200
        shadow-soft hover:shadow-card
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${className}
      `}
    >
      <span className="text-base sm:text-lg">
        {language === 'id' ? '🇮🇩' : '🇬🇧'}
      </span>
      <span className="font-body font-semibold text-xs sm:text-sm text-gray-700">
        {language.toUpperCase()}
      </span>
    </button>
  );
}
