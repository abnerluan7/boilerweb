import apiClient from "../utils/apiClient";

export const getUserById = (_: string, userId: string) => {
  return apiClient(`users/${userId}`);
};

export function signIn(body: object): Promise<object | undefined> {
  // const random = Math.random();
  // const userTeste = {
  //   id: "someid",
  //   name: "valid name",
  //   age: 34,
  //   email: "valid email",
  //   password: "valid password",
  // };
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (random > 0.5) {
  //       resolve(userTeste);
  //     } else {
  //       reject("error updating user");
  //     }
  //   }, 3000);
  // });
  return apiClient("auth/signin/", body);
}

export function signUp(body: object): Promise<object | undefined> {
  return apiClient("auth/signup/", body);
}
