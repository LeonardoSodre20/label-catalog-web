import { LABELS_KEYS } from '@/shared/constants/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LabelsService } from '../services/labels.service'

const labelsService = new LabelsService()

export function useDeleteLabel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => labelsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LABELS_KEYS.list })
    },
  })
}
