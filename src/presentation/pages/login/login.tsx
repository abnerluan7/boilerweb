import React from "react";
import { Box, IconButton, Paper, Typography } from "@material-ui/core";
import { LOGIN_FORM } from "~/presentation/common/constants";
import { Validation } from "~/presentation/common/protocols";
import { LoginFormTypes } from "~/presentation/common/types";
import { useAuth, useToggleTheme, useTranslation } from "~/presentation/hooks";
import { FormProvider } from "~/presentation/providers";
import { LoginForm } from "./components";
import { useStyles } from "./login-styles";
import useLectures from "~/presentation/hooks/useLectures";

type Props = {
  validation: Validation;
};

const LoginPage: React.FC<Props> = ({ validation }) => {
  const { translate } = useTranslation();
  const classes = useStyles();
  const { emailSignIn } = useAuth();
  const { toggleTheme, type } = useToggleTheme();

  const handleSubmit = async (values: LoginFormTypes): Promise<void> => {
    await emailSignIn(values);
  };

  const lectures = useLectures();

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Box className={classes.form}>
          <Typography variant="h4" align="center">
            {translate("common.hello")}
          </Typography>
          <FormProvider
            form={LOGIN_FORM}
            errors={LOGIN_FORM}
            validation={validation}
            onSubmit={handleSubmit}
          >
            <LoginForm validation={validation} />
          </FormProvider>

          <Box mt={2} display="flex" justifyContent="center">
            <IconButton onClick={toggleTheme}>{type}</IconButton>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
