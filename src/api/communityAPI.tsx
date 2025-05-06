import { apiHandler } from './apiHandler';
import { api_url} from '../environment';

export const fetchCommunity = async () => {
    return await apiHandler(`${api_url}v1/communities`, "GET");
};

export const saveCommunity = async (formData: any) => {
    return await apiHandler(`${api_url}v1/communities`, "POST", formData, false);
};

export const deleteCommunity = async (id: number) => {
    return await apiHandler(`${api_url}v1/communities/${id}`, "DELETE");
};

export const likeCommunity = async (id: number) => {
    return await apiHandler(`${api_url}v1/communities/${id}/like`, "POST");
};

export const unlikeCommunity = async (id: number) => {
    return await apiHandler(`${api_url}v1/communities/${id}/unlike`, "DELETE");
};

export const countLikeCommunity = async (id: number) => {
    return await apiHandler(`${api_url}v1/communities/${id}/likes`, "GET");
};