import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsCaseRequest {
  query: string
  page: number
}
interface SearchGymsCaseResponse {
  gyms: Gym[];

}

export class SearchGymsCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute(
    props: SearchGymsCaseRequest
  ): Promise<SearchGymsCaseResponse> {
    const {query, page } = props

    const gyms = await this.gymRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}
