import { apiHandler } from './apiHandler';
import { api_url,text_gear_url,text_gear_api_key } from '../environment';
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

  export const fetchPracticeLog = async (id: number) => {
    return await apiHandler(`${api_url}v1/practice/log/${id}`, "GET");
  };

  export const savePractice = async (type:any,formData: any) => {
      return await apiHandler(`${api_url}v1/savePractice`, "POST",formData,type && true);
  };

  export const fetchQuestions = async (subtype_id: number, params: any) => {
    return await apiHandler(
      `${api_url}v1/get-questions/${subtype_id}`,
      "GET",
      { params }  // Axios expects query parameters to be passed this way
    );
  };

  export const saveBookmark = async (formData: any) => {
      return await apiHandler(`${api_url}v1/bookmarks`, "POST",formData);
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

export async function fetchSpellCheck(data: string, type: string,lang='British') {
   
    const language = lang === "American" ? "en-US" : "en-GB";
    const ai = "1";
  
    const endpoint = type === "grammar" ? "grammar" : "spelling";
    const url = `${text_gear_url}/${endpoint}?key=${text_gear_api_key}&language=${language}&ai=${ai}&text=${encodeURIComponent(
      data
    )}`;
  
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data.response.errors;
      } else {
        throw new Error("Failed to fetch spell check data");
      }
    } catch (error) {
      throw error;
    }
  }
  
  export async function fetchExceptions(limit = 10000, offset = 0) {
       
    const url = `${text_gear_url}/custom/listexceptions?limit=${limit}&offset=${offset}&key=${text_gear_api_key}`;
  
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data.response.exceptions;
      } else {
        throw new Error("Failed to fetch exceptions data");
      }
    } catch (error) {
      throw error;
    }
  }