const httpClient = (url: string): Promise<Response> => {
  // fetch, axios, etc
  return fetch("");
};

export const getLectures = (): Promise<Response> => {
  return httpClient("/url");
};
