const Messages = {
  invalidRequest: "Requisição inválida.",
  invalidJsonRequest: "Requisição json inválida.",
  configurationMissing:
    "Configuração inexistente. Por favor, entre em contato com o administrador.",
  required: "Campo obrigatório.",
  max: (max: number) => `O campo deve ter no máximo ${max} caracteres.`,
  min: (min: number) => `O campo deve ter no mínimo ${min} caracteres.`,
  uuid: "O campo deve ser um  UUID válido.",
  date: "O campo deve ser uma date válido .",
  integer: "O campo deve ser um número válido.",
  email: "O campo deve ser um email válido.",
  weekPass:
    "Precisa conter no minimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um numero e um caractere especial.",
  undefinedError:
    "Encontramos um erro. Por favor, entre em contato com o administrador.",
  forbidden: "Proibido.",
  fieldRegistered: "O {field} já está registrado.",
  fieldNotFound: "O {field} não foi encontrado.",
  fieldDisabled: "O {field} está desabilitado.",
};

export default {
  Messages,
};
