import { USERS_KEYS } from '@/shared/constants/query-keys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'

const usersService = new UsersService()

export function useUsers(page: number, search?: string, size = 20) {
  return useQuery({
    queryKey: [...USERS_KEYS.list, { page, size, search }],
    queryFn: () => usersService.list(page, size, search),
    placeholderData: keepPreviousData,
  })
}
