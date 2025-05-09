import { apiHandler } from './apiHandler';
import { api_url,text_gear_url,text_gear_api_key } from '../environment';

export const fetchMocktests = async (id: number) => {
    try {
      const mocktestType = localStorage.getItem("mocktestType") || "Academic"; // default fallback
      const url = `${api_url}v1/mocktests/${id}?mocktestType=${encodeURIComponent(mocktestType)}`;
      return await apiHandler(url, "GET");
    } catch (error) {
      console.error("Error fetching mocktests:", error);
      throw error;
    }
  };

  export const validateMocktest = async (mocktestId:any,formData: any) => {
      return await apiHandler(`${api_url}v1/mocktests/validate/${mocktestId}`, "POST",formData);
  };

  export const saveIntroduction = async (formData: any) => {
      return await apiHandler(`${api_url}v1/mocktests/save-introduction`, "POST",formData,true);
  };

  export const sessionValidate = async (formData: any) => {
      return await apiHandler(`${api_url}v1/mocktests/session-validate`, "POST",formData);
  };

  export const mockTestQuestions = async (mocktestId:any) => {
      return await apiHandler(`${api_url}v1/mocktest/${mocktestId}/questions`, "GET");
  };