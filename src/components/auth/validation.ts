
/**
 * Email validation function using a simple but reliable regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Password validation - checks length and required characters
 */
export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return password.length >= minLength && hasLetter && hasNumber;
};
