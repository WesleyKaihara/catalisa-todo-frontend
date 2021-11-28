const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//validar string
//expressao regular
export const validateEmail = (text) => {
    return text && EMAIL_REGEX.test(text)
        ? undefined
        : 'Informe um endereço e-mail válido'
};

export const validatePassword = (text) => {
    return text?.length >= 6 && text?.length <= 80
        ? undefined
        : 'A senha deve possuir de 6 a 80 caracteres'
};

export const validateName = (text) => {
    return text?.length >= 1 && text?.length <= 200
        ? undefined
        : 'O nome deve possuir de 1 a 200 caracteres'
};

