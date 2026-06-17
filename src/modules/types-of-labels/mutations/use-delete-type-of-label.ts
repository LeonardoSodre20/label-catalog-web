import { TYPES_OF_LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

const typesOfLabelsService = new TypesOfLabelsService()

export function useDeleteTypeOfLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => typesOfLabelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TYPES_OF_LABELS_KEYS.list })
    },
  })
}
