import axios from 'axios';

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

/**
 * Translate text from English to Indonesian using MyMemory API
 * @param {string} text - Text to translate
 * @returns {Promise<string>} - Translated text
 */
export const translateToIndonesian = async (text) => {
  try {
    const response = await axios.get(MYMEMORY_API, {
      params: {
        q: text,
        langpair: 'en|id'
      }
    });

    if (response.data && response.data.responseData) {
      return response.data.responseData.translatedText;
    }

    return text; // Fallback to original if translation fails
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original on error
  }
};

/**
 * Translate a quiz question and all its answers
 * @param {Object} question - Question object from OpenTDB
 * @returns {Promise<Object>} - Question with translated text
 */
export const translateQuestion = async (question) => {
  try {
    // Translate question text
    const translatedQuestion = await translateToIndonesian(question.question);

    // Translate all answers (correct + incorrect)
    const translatedCorrectAnswer = await translateToIndonesian(question.correct_answer);

    const translatedIncorrectAnswers = await Promise.all(
      question.incorrect_answers.map(answer => translateToIndonesian(answer))
    );

    // If question has allAnswers array, translate those too
    let translatedAllAnswers = question.allAnswers;
    if (question.allAnswers && Array.isArray(question.allAnswers)) {
      translatedAllAnswers = await Promise.all(
        question.allAnswers.map(answer => translateToIndonesian(answer))
      );
    }

    return {
      ...question,
      question: translatedQuestion,
      correct_answer: translatedCorrectAnswer,
      incorrect_answers: translatedIncorrectAnswers,
      allAnswers: translatedAllAnswers
    };
  } catch (error) {
    console.error('Question translation error:', error);
    return question; // Fallback to original on error
  }
};

/**
 * Translate multiple questions
 * @param {Array} questions - Array of question objects
 * @returns {Promise<Array>} - Array of translated questions
 */
export const translateQuestions = async (questions) => {
  try {
    const translatedQuestions = await Promise.all(
      questions.map(question => translateQuestion(question))
    );
    return translatedQuestions;
  } catch (error) {
    console.error('Batch translation error:', error);
    return questions; // Fallback to originals on error
  }
};
