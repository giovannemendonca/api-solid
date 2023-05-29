import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'
import type { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUserCase {
  constructor(private useRepository: UsersRepository) {}

  async execute(
    props: RegisterUseCaseRequest
  ): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = props
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.useRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.useRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
