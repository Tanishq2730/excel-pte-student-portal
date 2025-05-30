import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const progressBar = async () => {
    return await apiHandler(`${api_url}v1/dashboard/progress-bar`, "GET");
};

export const graphData = async (data: any) => {
    return await apiHandler(`${api_url}v1/dashboard/graph-data`, "POST",data);
};

export const timeSpent = async () => {
    return await apiHandler(`${api_url}v1/dashboard/time-spent`, "GET");
};