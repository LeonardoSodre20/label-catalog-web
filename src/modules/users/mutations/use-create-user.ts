import { USERS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'
import type { CreateUserRequest } from '../types/user-types'

const usersService = new UsersService()

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.list })
    },
  })
}
