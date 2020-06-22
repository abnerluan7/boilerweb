import React from "react";
import { useAuth } from "../../../providers/AuthProvider";
import validateSchema from "../../../utils/validateSchema";
import {resetValidator} from "../../../utils/validators/authValidator";
import { useMutation } from "react-query";
import { resetPassword } from "../../../services/userService";

import { Container, Input, Button, Title, Error } from "./styles";
import User from "../../../types/User";
interface Error {
  confirmPassword?: string | null;
  password?: string | null;
}
interface Form {
  confirmPassword?: string;
  password?: string;
}
type InitialState = {
  form?: Form;
  errors?: Error;
};
const initialState = {
  form: {
    confirmPassword: "",
    password: "",
  },
};

interface RouterProps {
  match: any;
}
type Props = RouterProps;

const Reset = ({
  match,
 }: Props) =>{
  const [state, setState] = React.useReducer(
    (oldValue: InitialState, newValue: InitialState) => ({
      ...oldValue,
      ...newValue,
    }),
    initialState
  );

  const { login } = useAuth();

  const [mutate, mutation] = useMutation(resetPassword, {
    onMutate: () => {
      console.log("mutation started");
    },
    onError: (error) => {
      console.log("this error occurred", error);
    },
    onSuccess: (data: User) => {
      login(data);
    },
  });

  const handleSubmit = () => {
    const errorsSchema = validateSchema<Error>(state.form, resetValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
    } else {
      mutate({ confirmPassword: state.form?.confirmPassword, password: state.form?.password, token: match.params.tokenReset });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      form: { ...state.form, [e.target.name]: e.target.value },
      errors: { ...state.errors, [e.target.name]: null },
    });
  };

  return (
    <>
      <Container>
        <Title>Alterar senha</Title>
        <Input
          type="password"
          name="password"
          placeholder="Informe sua nova senha"
          value={state.form?.password}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.password}</Error>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Informe novamente sua nova senha"
          value={state.form?.confirmPassword}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.confirmPassword}</Error>

        <Button
          primary
          onClick={handleSubmit}
          disabled={mutation.status === "loading"}
        >
          Enviar
        </Button>
      </Container>
    </>
  );
}

export default Reset;
