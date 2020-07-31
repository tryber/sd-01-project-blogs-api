const objErrorHandler = {
  SequelizeUniqueConstraintError: {
    name: 'ValidateError',
    detail: 'Usuário já existe',
    status: 400,
  },
  SequelizeValidationError: {
    name: 'invalidFieldError',
    detail: 'Campo invalido.',
    status: 400,
  },
  invalidFields: {
    name: 'invalidFields',
    detail: 'Campos inválidos',
    status: 400,
  },
  unauthorizedError: {
    name: 'unauthorized',
    detail: 'Não possui autorização',
    status: 401,
  },
  SequelizeEmptyResultError: {
    name: 'NotFoundError',
    detail: `Item não foi encontrado`,
    status: 404,
  },
  InvalidId: {
    name: 'InvalidId',
    detail: 'Id não é valido',
    status: 500,
  },
  InvalidToken: {
    name: 'InvalidToken',
    detail: 'Token Invalido.',
    status: 401,
  }
}

const objectErrorHandler = (error) => {
  if (!objErrorHandler[error.name]) {
    error.details = 'Algo deu errado!';
    error.statusResponse = 500;
    throw error;
  }
  return objErrorHandler[error.name];
}

const createError = (errorData) => {
  const { name, detail, status } = errorData;
  const genericError = new Error(name);
  genericError.details = detail;
  genericError.statusResponse = status;
  throw genericError;
}

exports.handleError = (error, param = '') => {
  createError(objectErrorHandler(error, param));
}
