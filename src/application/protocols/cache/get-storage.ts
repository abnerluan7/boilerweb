export interface GetStorage {
  get: <T extends object = {}>(key: string) => T
}
