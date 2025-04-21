import { apiHandler } from './apiHandler';
import { api_url } from '../environment';

// ✅ Fetch All Topics
export const fetchQuestionData = async (subtype_id: number, question_id?: number) => {
    let url = `${api_url}v1/fetchQuestionData/subtype/${subtype_id}/question`;
    if (question_id) {
      url += `/${question_id}`;
    }
    return await apiHandler(url, "GET");
  };

  export const fetchPracticeLogs = async (question_id: number) => {
    return await apiHandler(`${api_url}v1/practice/logs/${question_id}`, "GET");
  };