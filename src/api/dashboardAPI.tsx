import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const DashboardCounts = async () => {
    return await apiHandler(`${api_url}v1/dashboard/counts`, "GET");
};

