import { UsersRepository } from '@/repositories/prisma/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserCase {
  constructor(private useRepository: UsersRepository) {}

  async execute(props: RegisterUseCaseRequest) {
    const { name, email, password } = props
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.useRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }


    await this.useRepository.create({
      name,
      email, 
      password_hash
    })
  }
}
