import { TYPES_OF_LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypesOfLabelsService } from '../services/types-of-labels.service'
import type { CreateTypeOfLabelRequest } from '../types/type-of-label-types'

const typesOfLabelsService = new TypesOfLabelsService()

export function useCreateTypeOfLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTypeOfLabelRequest) =>
      typesOfLabelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TYPES_OF_LABELS_KEYS.list })
    },
  })
}
