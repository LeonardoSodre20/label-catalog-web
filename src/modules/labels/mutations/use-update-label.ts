import { LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LabelsService } from '../services/labels.service'
import type { UpdateLabelRequest } from '../types/label-types'

const labelsService = new LabelsService()

export function useUpdateLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLabelRequest }) =>
      labelsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_KEYS.list })
    },
  })
}
