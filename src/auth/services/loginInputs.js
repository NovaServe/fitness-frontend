export const inputs = [
  {
    label: 'Username, email, or phone number',
    type: 'text',
    name: 'usernameOrEmailOrPhone',
    rules: {
      required: 'Value is required',
      minLength: { value: 3, message: 'Must be at least 3 characters' },
      maxLength: { value: 20, message: 'Must not exceed 20 characters' }
    }
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    rules: {
      required: 'Value is required',
      minLength: { value: 8, message: 'Must be at least 8 characters' },
      maxLength: { value: 20, message: 'Must not exceed 20 characters' },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'
      }
    }
  }
];