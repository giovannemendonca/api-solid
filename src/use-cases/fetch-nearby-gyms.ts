import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}
interface FetchNearbyGymsResponse {
  gyms: Gym[];
}

export class FetchNearbyGyms {
  constructor(private gymRepository: GymsRepository) {}

  async execute(
    props: FetchNearbyGymsRequest
  ): Promise<FetchNearbyGymsResponse> {
    const { userLatitude, userLongitude } = props

    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
