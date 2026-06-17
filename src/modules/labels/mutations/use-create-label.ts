import { LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LabelsService } from '../services/labels.service'
import type { CreateLabelRequest } from '../types/label-types'

const labelsService = new LabelsService()

export function useCreateLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLabelRequest) => labelsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_KEYS.list })
    },
  })
}
