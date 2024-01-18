const hashPassword = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, 'bcrypt')
}

const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await Bun.password.verify(password, hash, 'bcrypt')
}

export { hashPassword, comparePasswords }
