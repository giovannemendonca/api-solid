import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUserCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute(
    props: CreateGymUseCaseRequest
  ): Promise<CreateGymUseCaseResponse> {
    const { title, phone, description, latitude, longitude } = props

    const gym = await this.gymRepository.create({
      title,
      phone,
      description,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
