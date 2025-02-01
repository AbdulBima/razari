// services/staffApi.ts
import companyApi from '@/utils/apiCompany';


export const getStaffList = (companyId: string, skip: number, limit: number) => {
    return companyApi.get(`staff/${companyId}/staff-list`, {
      params: { skip, limit },
    });
  };
  

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStaff = async (companyId: string, staffData: any) => {
  return companyApi.post(`staff/${companyId}/create`, staffData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStaff = async (companyId: string, staffId: string, updatedData: any) => {
  return companyApi.put(`staff/${companyId}/${staffId}/stfx/update`, updatedData);
};

export const deleteStaff = async (companyId: string, staffId: string) => {
  return companyApi.delete(`staff/${companyId}/delete/${staffId}`);
};

export const activateStaff = async (companyId: string, staffId: string) => {
  return companyApi.patch(`staff/${companyId}/${staffId}/activate`);
};

export const deactivateStaff = async (companyId: string, staffId: string) => {
  return companyApi.patch(`staff/${companyId}/${staffId}/deactivate`);
};

export const updatePassword = async (
    companyId: string,
    staffId: string,
    passwordData: { newPassword: string }
  ) => {
    return companyApi.put(
      `staff/${companyId}/${staffId}/update-password`,
      passwordData
    );
  };
  