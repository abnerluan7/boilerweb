export interface SetStorage {
  set: <T extends object = {}>(key: string, value: T) => void
}
