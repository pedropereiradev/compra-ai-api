import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (password: string): string => {
  const hash = bcrypt.hashSync(password, SALT_ROUNDS);

  return hash;
};

export const validatePassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  const isValid = bcrypt.compareSync(password, hashedPassword);

  return isValid;
};
