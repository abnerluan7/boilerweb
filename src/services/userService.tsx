import apiClient from "../utils/apiClient";
import User from "../types/User";

export const getUserById = (_: string, userId: string) => {
  return apiClient(`users/${userId}`);
};

export function signIn(body: object): Promise<User> {
  return apiClient("auth/signin/", { body: body });
}

export function signUp(body: object): Promise<User> {
  return apiClient("auth/signup/", { body: body });
}

export function recoveryPassword(email: string): Promise<User> {
  return apiClient("auth/forgotpassword?email="+email, { body: {} });
}

export function resetPassword(body: any): Promise<User> {
  const query = 'password='+body?.password+'&password_confirmation='+body?.confirmPassword+'&security='+body?.token
  return apiClient("auth/resetpassword/?"+query, { body: {} });
}