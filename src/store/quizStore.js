import { create } from 'zustand';
import { storage } from '../utils/storage';

export const useQuizStore = create((set, get) => ({
  config: {
    totalQuestions: 10,
    category: null,
    difficulty: 'medium',
    timerDuration: 300
  },
  questions: [],
  currentIndex: 0,
  answers: {},
  correctAnswers: 0,
  wrongAnswers: 0,
  skippedAnswers: 0,
  status: 'idle',
  timeRemaining: 0,
  startedAt: null,

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
      config: {
        totalQuestions: 10,
        category: null,
        difficulty: 'medium',
        timerDuration: 300
      },
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
