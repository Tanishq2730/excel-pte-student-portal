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