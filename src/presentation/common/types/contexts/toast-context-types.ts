export type ToastContextProps = {
  addToast: (params: AddToastParams) => void
  removeToast: (id: string) => void
}

export type ToastProps = {
  id: string
  text: string
  type?: ToastType
  test?: string
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}

export type AddToastParams = {
  text: string
  type?: ToastType
  test?: string
}
