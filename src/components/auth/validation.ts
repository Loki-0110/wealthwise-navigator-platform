
/**
 * Email validation function using a simple but reliable regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Password validation - checks length and required characters
 * Enhanced to ensure stronger passwords with special characters
 */
export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const noCommonPatterns = !/(123456|password|qwerty|abc123)/i.test(password);
  
  return password.length >= minLength && hasLetter && hasNumber && hasSpecialChar && noCommonPatterns;
};

/**
 * Username validation to ensure it contains only valid characters
 */
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Full name validation to ensure it's properly formatted
 */
export const validateFullName = (fullName: string): boolean => {
  return fullName.trim().length >= 2 && fullName.includes(" ");
};
