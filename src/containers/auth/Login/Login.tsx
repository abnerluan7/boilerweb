import React from "react";
import { useAuth } from "../../../providers/AuthProvider";
import validateSchema from "../../../utils/validateSchema";
import {loginValidator} from "../../../utils/validators/authValidator";
import { useMutation } from "react-query";
import { signIn } from "../../../services/userService";
import { Link } from "react-router-dom";

import { Container, Input, Button, Title, Error, Recovery } from "./styles";
import User from "../../../types/User";
interface Error {
  email?: string | null;
  password?: string | null;
}
interface Form {
  email?: string;
  password?: string;
}
type InitialState = {
  form?: Form;
  errors?: Error;
};
const initialState = {
  form: {
    email: "",
    password: "",
  },
};

function Login() {
  const [state, setState] = React.useReducer(
    (oldValue: InitialState, newValue: InitialState) => ({
      ...oldValue,
      ...newValue,
    }),
    initialState
  );

  const { login } = useAuth();

  const [mutate, mutation] = useMutation(signIn, {
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
    const errorsSchema = validateSchema<Error>(state.form, loginValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
    } else {
      mutate({ email: state.form?.email, password: state.form?.password });
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
        <Title>Seja bem vindo, faça login para continuar </Title>
        <Input
          type="email"
          name="email"
          placeholder="Informe seu email"
          value={state.form?.email}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.email}</Error>
        <Input
          type="password"
          name="password"
          placeholder="Informe sua senha"
          value={state.form?.password}
          onChange={handleInputChange}
        />
        <Link to="/recovery" style={{
          textDecoration: 'none',
          textAlign: 'right',
          alignItems: 'rigth',
          alignContent: 'rigth',
          width: '350px'
        }}>
          <Recovery>Esqueceu a senha?</Recovery>
        </Link>
        <Error>{state.errors?.password}</Error>

        <Button
          primary
          onClick={handleSubmit}
          disabled={mutation.status === "loading"}
        >
          Entrar
        </Button>
        <Link to="/signup" >Cadastrar</Link>
      </Container>
    </>
  );
}

export default Login;
