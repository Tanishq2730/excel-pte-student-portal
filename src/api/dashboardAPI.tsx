import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const DashboardCounts = async () => {
    return await apiHandler(`${api_url}v1/dashboard/counts`, "GET");
};
export const ExamCountdown = async () => {
    return await apiHandler(`${api_url}v1/dashboard/exam-countdown`, "GET");
};
export const SetExamCountdown = async (data:any) => {
    return await apiHandler(`${api_url}v1/dashboard/exam-countdown`, "POST",data);
};
export const StudyPlaner = async (date: string, typeId: number) => {
    return await apiHandler(`${api_url}v1/dashboard/study-plan-progress?date=${date}&typeId=${typeId}`, "GET");
};
export const DashboardVideo = async () => {
    return await apiHandler(`${api_url}v1/dashboard/pte-video`, "GET");
};
export const ReviewsData = async () => {
    return await apiHandler(`${api_url}v1/dashboard/reviews`, "GET");
};
export const UpcommingClasses = async () => {
    return await apiHandler(`${api_url}v1/dashboard/upcoming-classes`, "GET");
};
export const RecentActivity = async () => {
    return await apiHandler(`${api_url}v1/dashboard/recent-activity`, "GET");
};
export const RecentMocktestResults = async () => {
    return await apiHandler(`${api_url}v1/dashboard/mocktest-results/recent-by-type`, "GET");
};
export const ProgressBar = async () => {
    return await apiHandler(`${api_url}v1/dashboard/mocktest-counts`, "GET");
};

