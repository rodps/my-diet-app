import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

export { hashPassword, comparePasswords }
