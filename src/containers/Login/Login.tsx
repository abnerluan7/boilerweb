import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import validateSchema from "../../utils/validateSchema";
import loginValidator from "../../utils/validators/loginValidator";
import { useMutation } from "react-query";
import { signIn } from "../../services/userService";

import { Container, Input, Button, Title, Error } from "./styles";
import User from "../../types/User";
interface Error {
  email: "";
  password: "";
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
    onSuccess: (data) => {
      login(data as User);
    },
  });

  const { form, errors } = state;

  const handleSubmit = () => {
    const login = {
      email: form?.email,
      password: form?.password,
    };
    setState({
      errors: undefined,
    });
    const errorsSchema = validateSchema<Error>(login, loginValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
    } else {
      mutate(login);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const name = event.target.name;
    setState({
      form: { ...form, [name]: newValue },
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
          value={form?.email}
          onChange={handleInputChange}
        />
        <Error>{errors?.email}</Error>
        <Input
          type="password"
          name="password"
          placeholder="Informe sua senha"
          value={form?.password}
          onChange={handleInputChange}
        />
        <Error>{errors?.password}</Error>

        <Button onClick={handleSubmit} disabled={mutation.status === "loading"}>
          Entrar
        </Button>
        <Button primary>Cadastrar</Button>
      </Container>
    </>
  );
}

export default Login;
