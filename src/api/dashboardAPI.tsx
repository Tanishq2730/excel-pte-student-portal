import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const DashboardCounts = async () => {
    return await apiHandler(`${api_url}v1/dashboard/counts`, "GET");
};
export const ExamCountdown = async () => {
    return await apiHandler(`${api_url}v1/dashboard/exam-countdown`, "GET");
};
export const StudyPlaner = async (date: string, typeId: number) => {
    return await apiHandler(`${api_url}v1/dashboard/study-plan-progress?date=${date}&typeId=${typeId}`, "GET");
};

