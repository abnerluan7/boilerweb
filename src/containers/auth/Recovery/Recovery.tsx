import React from "react";
import validateSchema from "../../../utils/validateSchema";
import {recoveryValidator} from "../../../utils/validators/authValidator";
import { useMutation } from "react-query";
import { recoveryPassword } from "../../../services/userService";
import { Link } from "react-router-dom";

import { Container, Input, Button, Title, Error } from "./styles";
import User from "../../../types/User";
interface Error {
  email?: string | null;
}
interface Form {
  email?: string;
}
type InitialState = {
  form?: Form;
  errors?: Error;
};
const initialState = {
  form: {
    email: "",
  },
};

interface HistoryProps {
  history: any;
}
type Props = HistoryProps;

const Recovery = ({
  history,
 }: Props) => {
  const [state, setState] = React.useReducer(
    (oldValue: InitialState, newValue: InitialState) => ({
      ...oldValue,
      ...newValue,
    }),
    initialState
  );

  const [mutate, mutation] = useMutation(recoveryPassword, {
    onMutate: () => {
      console.log("mutation started");
    },
    onError: (error) => {
      console.log("this error occurred", error);
    },
    onSuccess: (data: User) => {
      history.push('login')
    },
  });

  const handleSubmit = () => {
    const errorsSchema = validateSchema<Error>(state.form, recoveryValidator);

    if (errorsSchema) {
      setState({
        errors: errorsSchema,
      });
    } else {
      mutate( state.form?.email ? state.form?.email : '');
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
        <Title>Insira o email da conta para recuperação</Title>
        <Input
          type="email"
          name="email"
          placeholder="Informe seu email"
          value={state.form?.email}
          onChange={handleInputChange}
        />
        <Error>{state.errors?.email}</Error>

        <Button
          primary
          onClick={handleSubmit}
          disabled={mutation.status === "loading"}
        >
          Enviar
        </Button>
        <Link to="/login" >Login</Link>
      </Container>
    </>
  );
}

export default Recovery;
