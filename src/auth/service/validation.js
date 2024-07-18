function validateText(text) {
    text = text.trim();
    let message = '';
    if (text === '' || text === null && text === undefined) {
        message += 'No value';
    }
    return message;
}

export function validateLoginForm(usernameOrEmailOrPhone, password) {
    const errors = {
        usernameOrEmailOrPhone: validateText(usernameOrEmailOrPhone),
        password: validateText(password),
    };
    const isValid = Object.values(errors).every((error) => error === '');
    return {
        isValid,
        ...errors,
    };
};