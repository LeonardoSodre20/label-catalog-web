import { USERS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UsersService } from '../services/users.service'

const usersService = new UsersService()

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ids: number[]) => usersService.delete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.list })
    },
  })
}
