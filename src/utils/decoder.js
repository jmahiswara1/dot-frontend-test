import he from 'he';

export const decodeHTML = (text) => {
  if (!text) return '';
  return he.decode(text);
};

export const decodeQuestion = (question) => {
  return {
    ...question,
    question: decodeHTML(question.question),
    correct_answer: decodeHTML(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(decodeHTML)
  };
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
