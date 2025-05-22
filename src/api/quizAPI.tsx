import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const fetchCategoryQuiz = async () => {
    return await apiHandler(`${api_url}v1/get-quiz-category`, "GET");
};

export const fetchQuizQuestions = async (quizId:number) => {
    return await apiHandler(`${api_url}v1/quiz-questions/${quizId}`, "GET");
};

export const saveQuizQuestions = async (quizId:any,questionId:any,data:any) => {
    return await apiHandler(`${api_url}v1/quizzes/${quizId}/questions/${questionId}/attempt`, "POST",data);
};

export const fetchScores = async (quizId:number) => {
    return await apiHandler(`${api_url}v1/quizzes/${quizId}/score`, "GET");
};

export const fetchReviews = async (quizId:number) => {
    return await apiHandler(`${api_url}v1/quiz_result/${quizId}`, "GET");
};