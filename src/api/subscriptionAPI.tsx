import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const fetchPlans = async (id:number) => {
    return await apiHandler(`${api_url}v1/get-plans/${id}`, "GET");
};