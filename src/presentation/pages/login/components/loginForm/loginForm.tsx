import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Validation } from '~/presentation/common/protocols'
import { TextInput } from '~/presentation/components'
import { useForm, useTranslation } from '~/presentation/hooks'

type Props = {
  validation: Validation
}

const LoginForm: React.FC<Props> = () => {
  const { translate } = useTranslation()
  const { onSubmit } = useForm()
  return (
    <form role='form' onSubmit={onSubmit}>
      <div>
        <TextInput
          name='email'
          label={translate('common.email')}
          autoComplete='email'
        />
        <TextInput
          name='password'
          label={translate('common.password')}
          type='password'
          autoComplete='current-password'
        />
      </div>
      <Box mt={1}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          data-testid='submit-button'
        >
          {translate('actions.enter')}
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
