import { create } from 'zustand';
import { storage } from '../utils/storage';

const defaultConfig = {
  totalQuestions: 10,
  category: null,
  difficulty: 'medium',
  timerDuration: 300
};

const sessionFromStorage = storage.getSession();

const initialState = sessionFromStorage
  ? {
      config: sessionFromStorage.config || defaultConfig,
      questions: sessionFromStorage.questions || [],
      currentIndex: sessionFromStorage.currentIndex || 0,
      answers: sessionFromStorage.answers || {},
      correctAnswers: sessionFromStorage.correctAnswers || 0,
      wrongAnswers: sessionFromStorage.wrongAnswers || 0,
      skippedAnswers: sessionFromStorage.skippedAnswers || 0,
      status: sessionFromStorage.status || 'playing',
      timeRemaining: sessionFromStorage.timeRemaining || 0,
      startedAt: sessionFromStorage.startedAt || null
    }
  : {
      config: defaultConfig,
      questions: [],
      currentIndex: 0,
      answers: {},
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedAnswers: 0,
      status: 'idle',
      timeRemaining: 0,
      startedAt: null
    };

export const useQuizStore = create((set, get) => ({
  ...initialState,

  setConfig: (config) => {
    set({ config: { ...get().config, ...config } });
  },

  startQuiz: (questions) => {
    const { config } = get();
    const sessionData = {
      config,
      questions,
      currentIndex: 0,
      answers: {},
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedAnswers: 0,
      timeRemaining: config.timerDuration,
      startedAt: new Date().toISOString()
    };

    storage.setSession(sessionData);
    set({
      questions,
      currentIndex: 0,
      answers: {},
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedAnswers: 0,
      status: 'playing',
      timeRemaining: config.timerDuration,
      startedAt: sessionData.startedAt
    });
  },

  selectAnswer: (questionIndex, selectedAnswer) => {
    const { questions, answers, correctAnswers, wrongAnswers } = get();
    const question = questions[questionIndex];
    const isCorrect = selectedAnswer === question.correct_answer;

    const newAnswers = { ...answers, [questionIndex]: selectedAnswer };
    const newCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
    const newWrong = !isCorrect ? wrongAnswers + 1 : wrongAnswers;

    set({
      answers: newAnswers,
      correctAnswers: newCorrect,
      wrongAnswers: newWrong
    });

    get().saveToStorage();
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
      get().saveToStorage();
    } else {
      get().finishQuiz();
    }
  },

  tickTimer: () => {
    const { timeRemaining } = get();
    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
      get().saveToStorage();
    } else {
      get().finishQuiz();
    }
  },

  finishQuiz: () => {
    const { questions, answers } = get();
    const unanswered = questions.length - Object.keys(answers).length;

    set({
      status: 'finished',
      skippedAnswers: unanswered
    });

    storage.clearSession();
  },

  saveToStorage: () => {
    const state = get();
    if (state.status === 'playing') {
      storage.setSession({
        config: state.config,
        questions: state.questions,
        currentIndex: state.currentIndex,
        answers: state.answers,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        skippedAnswers: state.skippedAnswers,
        timeRemaining: state.timeRemaining,
        startedAt: state.startedAt
      });
    }
  },

  resumeFromStorage: () => {
    const session = storage.getSession();
    if (session) {
      set({
        config: session.config,
        questions: session.questions,
        currentIndex: session.currentIndex,
        answers: session.answers,
        correctAnswers: session.correctAnswers,
        wrongAnswers: session.wrongAnswers,
        skippedAnswers: session.skippedAnswers,
        status: 'playing',
        timeRemaining: session.timeRemaining,
        startedAt: session.startedAt
      });
      return true;
    }
    return false;
  },

  clearStorage: () => {
    storage.clearSession();
    set({
      config: defaultConfig,
      questions: [],
      currentIndex: 0,
      answers: {},
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedAnswers: 0,
      status: 'idle',
      timeRemaining: 0,
      startedAt: null
    });
  }
}));
