import { apiHandler } from './apiHandler';
import { api_url } from '../environment';

// ✅ Fetch All Topics
export const register = async (formData: any) => {
    return await apiHandler(`${api_url}auth/register`, "POST",formData);
};

export const sendOTP = async (formData: any) => {
    return await apiHandler(`${api_url}otp/send-otp`, "POST",formData);
};

export const VerifyOTP = async (formData: any) => {
    return await apiHandler(`${api_url}otp/verify-otp`, "POST",formData);
};

export const changePassword = async (formData: any) => {
    return await apiHandler(`${api_url}auth/change-password`, "POST",formData);
};