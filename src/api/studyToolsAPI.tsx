import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const fetchClassRecordings = async () => {
    return await apiHandler(`${api_url}v1/get-class-recordings`, "GET");
};

export const fetchTemplates = async (id:number) => {
    return await apiHandler(`${api_url}v1/get-tempplates/${id}`, "GET");
};

export const fetchGrammars = async () => {
    return await apiHandler(`${api_url}v1/get-grammars`, "GET");
};

export const fetchPredictions = async () => {
    return await apiHandler(`${api_url}v1/get-predictions`, "GET");
};

export const fetchTimetables = async () => {
    return await apiHandler(`${api_url}v1/get-timetable`, "GET");
};