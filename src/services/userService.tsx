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

export function recoveryPassword(body: object): Promise<User> {
  return apiClient("auth/signin/", { body: body });
}

export function resetPassword(body: object): Promise<User> {
  return apiClient("auth/signin/", { body: body });
}