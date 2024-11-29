const MIN_PASSWORD_LENGTH = 8;

export const isPasswordValid = (password?: string): boolean => {
  if (!password) {
    return false;
  }
  const hasCorrectLength = password.length >= MIN_PASSWORD_LENGTH;
  const hasLowercaseLetters = /.*[a-z].*/.test(password);
  const hasUppercaseLetters = /.*[A-Z].*/.test(password);
  const hasNumbers = /.*[0-9].*/.test(password);

  return (
    hasLowercaseLetters && hasUppercaseLetters && hasNumbers && hasCorrectLength
  );
};
