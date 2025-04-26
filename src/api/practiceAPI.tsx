import { apiHandler } from './apiHandler';
import { api_url } from '../environment';
import axios from "axios";
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

  export const savePractice = async (type:any,formData: any) => {
      return await apiHandler(`${api_url}v1/savePractice`, "POST",formData,type && true);
  };

  export async function fetchWfdCheck(CorrectText: string, UserText: string, lang: string) {
    const headersList = {
        "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
        "api_key": "excelptetxtwfd012q73gk89",
        "diff_level": "word",
        "output_type": "html",
        "left": CorrectText,
        "right": UserText,
    });

    const reqOptions = {
        url: "https://excelpte.in/public/text",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    };

    try {
        const response = await axios.request(reqOptions);
        console.log(response, "response");
        return response.data; // The response data from the API
    } catch (error) {
        console.error("Error in fetchWfdCheck:", error);
        throw error;
    }
}