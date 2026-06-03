import { USERS_KEYS } from '@/shared/constants/query-keys'
import { useQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'

const usersService = new UsersService()

export function useUsers() {
  return useQuery({
    queryKey: USERS_KEYS.list,
    queryFn: () => usersService.list(),
  })
}
