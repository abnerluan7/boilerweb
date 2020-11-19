import React, { useMemo } from 'react'
import { Box, BoxProps, TextField, TextFieldProps } from '@material-ui/core'
import { useForm } from '~/presentation/hooks'

type Props = TextFieldProps & {
  styleProps?: BoxProps
  name: string
  label: string
}

const TextInput: React.FC<Props> = ({ name, label, styleProps, ...props }) => {
  const { form, errors, handleChange } = useForm()

  const value = useMemo(() => form[name], [form, name])
  const error = useMemo(() => errors[name], [errors, name])

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const { name, value } = event.target
    handleChange({ name, value })
  }

  return (
    <Box {...styleProps}>
      <TextField
        fullWidth
        onChange={onChange}
        name={name}
        label={label}
        value={value}
        error={!!error}
        helperText={error || ' '}
        inputProps={{ ...props.inputProps, 'data-testid': name }}
        FormHelperTextProps={{ title: `${name}-helper` }}
        {...props}
      />
    </Box>
  )
}

export default TextInput
