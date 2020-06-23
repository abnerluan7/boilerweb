import React from "react";
// import { useAuth } from "../../../providers/AuthProvider";
import validateSchema from "../../../utils/validateSchema";
import {signupValidator} from "../../../utils/validators/authValidator";
import { useMutation } from "react-query";
import { signUp } from "../../../services/userService";
import { Link } from "react-router-dom";

import { Container, Input, Button, Title, Error } from "./styles";
import User from "../../../types/User";
interface Error {
  email?: string | null;
  password?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}
interface Form {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}
type InitialState = {
  form?: Form;
  errors?: Error;
};
const initialState = {
  form: {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  },
};

interface HistoryProps {
  history: any;
}
type Props = HistoryProps;

const SignUp = ({
  history,
 }: Props) => {
  const [state, setState] = React.useReducer(
    (oldValue: InitialState, newValue: InitialState) => ({
      ...oldValue,
      ...newValue,
    }),
    initialState
  );

  // const { login } = useAuth();

  const [mutate, mutation] = useMutation(signUp, {
    onMutate: () => {
      console.log("mutation started");
    },
    onError: (error) => {
      console.log("this error occurred", error);
    },
    onSuccess: (data: User) => {
      // login(data);
      history.push('login')
    },
  });

  const handleSubmit = () => {
    const errorsSchema = validateSchema<Error>(state.form, signupValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
      console.log(errorsSchema);
    } else {
      mutate({
        email: state.form?.email,
        password: state.form?.password,
        firstname: state.form?.firstname,
        lastname: state.form?.lastname,
      });
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
        <Title>Seja bem vindo, cadastre-se para continuar </Title>
        <Input
          type="text"
          name="firstname"
          placeholder="Informe seu nome"
          value={state.form?.firstname}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.firstname}</Error>
        <Input
          type="text"
          name="lastname"
          placeholder="Informe seu sobrenome"
          value={state.form?.lastname}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.lastname}</Error>
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
        <Error>{state.errors?.password}</Error>

        <Button onClick={handleSubmit} disabled={mutation.status === "loading"}>
          Cadastrar
        </Button>
        <Link to="/login">Logar</Link>
      </Container>
    </>
  );
}

export default SignUp;
