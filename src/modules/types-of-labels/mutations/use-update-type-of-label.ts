import { TYPES_OF_LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypesOfLabelsService } from '../services/types-of-labels.service'
import type { UpdateTypeOfLabelRequest } from '../types/type-of-label-types'

const typesOfLabelsService = new TypesOfLabelsService()

export function useUpdateTypeOfLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: { id: number; data: UpdateTypeOfLabelRequest }) =>
      typesOfLabelsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TYPES_OF_LABELS_KEYS.list })
    },
  })
}
