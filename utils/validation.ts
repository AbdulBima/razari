// utils/validation.ts
export const validatePasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };
  