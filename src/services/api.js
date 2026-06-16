import axios from 'axios';
import { decodeQuestion, shuffleArray } from '../utils/decoder';

const API_BASE = 'https://opentdb.com/api.php';

export const fetchQuestions = async ({ amount, category, difficulty }) => {
  try {
    const params = {
      amount,
      type: 'multiple'
    };

    if (category) params.category = category;
    if (difficulty && difficulty !== 'mixed') params.difficulty = difficulty;

    const response = await axios.get(API_BASE, { params });

    if (response.data.response_code === 1) {
      return fetchQuestions({ amount, category, difficulty: 'mixed' });
    }

    if (response.data.response_code === 2) {
      return fetchQuestions({ amount, category: 9, difficulty });
    }

    const questions = response.data.results.map(q => {
      const decoded = decodeQuestion(q);
      const allAnswers = shuffleArray([
        decoded.correct_answer,
        ...decoded.incorrect_answers
      ]);

      return {
        ...decoded,
        allAnswers
      };
    });

    return { success: true, questions };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};
