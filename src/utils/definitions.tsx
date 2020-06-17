const Messages = {
  invalidRequest: 'Requisição inválida.',
  invalidJsonRequest: 'Requisição json inválida.',
  configurationMissing: 'Configuração inexistente. Por favor, entre em contato com o administrador.',
  required: 'Campo obrigatório.',
  max: (max: number) => `O campo deve ter no máximo ${max} caracteres.`,
  uuid: 'O campo deve ser um  UUID válido.',
  date: 'O campo deve ser uma date válido .',
  integer: 'O campo deve ser um número válido.',
  email: 'O campo deve ser um email válido.',
  undefinedError: 'Encontramos um erro. Por favor, entre em contato com o administrador.',
  forbidden: 'Proibido.',
  fieldRegistered: 'O {field} já está registrado.',
  fieldNotFound: 'O {field} não foi encontrado.',
  fieldDisabled: 'O {field} está desabilitado.',
}

export default {
  Messages,
}
