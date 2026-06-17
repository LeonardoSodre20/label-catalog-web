import { LABELS_KEYS } from '@/shared/constants/query-keys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { LabelsService } from '../services/labels.service'

const labelsService = new LabelsService()

export function useLabels(page: number, size = 20, search?: string) {
  return useQuery({
    queryKey: [...LABELS_KEYS.list, { page, size, search }],
    queryFn: () => labelsService.list(page, size, search),
    placeholderData: keepPreviousData,
  })
}
