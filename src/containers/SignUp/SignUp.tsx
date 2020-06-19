import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import validateSchema from "../../utils/validateSchema";
import signupValidator from "../../utils/validators/signupValidator";
import { useMutation } from "react-query";
import { signUp } from "../../services/userService";

import { Container, Input, Button, Title, Error } from "./styles";
import User from "../../types/User";
interface Error {
  email: "";
  password: "";
  firstname: "";
  lastname: "";
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

function SignUp() {
  const [state, setState] = React.useReducer(
    (oldValue: InitialState, newValue: InitialState) => ({
      ...oldValue,
      ...newValue,
    }),
    initialState
  );

  const { login } = useAuth();

  const [mutate, mutation] = useMutation(signUp, {
    onMutate: () => {
      console.log("mutation started");
    },
    onError: (error) => {
      console.log("this error occurred", error);
    },
    onSuccess: (data) => {
      console.log(data);
      login(data as User);
    },
  });

  const { form, errors } = state;

  const handleSubmit = () => {
    const signup = {
      email: form?.email,
      password: form?.password,
      firstname: form?.firstname,
      lastname: form?.lastname,
    };
    const errorsSchema = validateSchema<Error>(signup, signupValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
      console.log(errorsSchema);
    } else {
      mutate(signup);
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
        <Title>Seja bem vindo, cadastre-se para continuar </Title>
        <Input
          type="text"
          name="firstname"
          placeholder="Informe seu nome"
          value={form?.firstname}
          onChange={handleInputChange}
        />
        <Error>{errors?.firstname}</Error>
        <Input
          type="text"
          name="lastname"
          placeholder="Informe seu sobrenome"
          value={form?.lastname}
          onChange={handleInputChange}
        />
        <Error>{errors?.lastname}</Error>
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
        <Button primary>Logar</Button>
      </Container>
    </>
  );
}

export default SignUp;
