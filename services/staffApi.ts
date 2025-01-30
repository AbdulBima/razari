// services/staffApi.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/staff'; // Replace with your actual API base URL


export const getStaffList = (companyId: string, skip: number, limit: number) => {
    return axios.get(`${API_BASE_URL}/${companyId}/staff-list`, {
      params: { skip, limit },
    });
  };
  

export const createStaff = async (companyId: string, staffData: any) => {
  return axios.post(`${API_BASE_URL}/${companyId}/create`, staffData);
};

export const updateStaff = async (companyId: string, staffId: string, updatedData: any) => {
  return axios.put(`${API_BASE_URL}/${companyId}/${staffId}/stfx/update`, updatedData);
};

export const deleteStaff = async (companyId: string, staffId: string) => {
  return axios.delete(`${API_BASE_URL}/${companyId}/delete/${staffId}`);
};

export const activateStaff = async (companyId: string, staffId: string) => {
  return axios.patch(`${API_BASE_URL}/${companyId}/${staffId}/activate`);
};

export const deactivateStaff = async (companyId: string, staffId: string) => {
  return axios.patch(`${API_BASE_URL}/${companyId}/${staffId}/deactivate`);
};

export const updatePassword = async (
    companyId: string,
    staffId: string,
    passwordData: { newPassword: string }
  ) => {
    return axios.put(
      `${API_BASE_URL}/${companyId}/${staffId}/update-password`,
      passwordData
    );
  };
  