import { fireEvent, screen } from '@testing-library/react'

export const populateField = (value: string, fieldName: string): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
