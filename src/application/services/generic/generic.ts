/* eslint-disable @typescript-eslint/promise-function-async */
const httpClient = (url: string): Promise<Response> => {
  // fetch, axios, etc
  return fetch(url)
}

export const getLectures = (): Promise<Response> => {
  return httpClient('/url')
}
