import { TYPES_OF_LABELS_KEYS } from '@/shared/constants/query-keys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

const typesOfLabelsService = new TypesOfLabelsService()

export function useTypesOfLabels(page: number, size = 20, search?: string) {
  return useQuery({
    queryKey: [...TYPES_OF_LABELS_KEYS.list, { page, size, search }],
    queryFn: () => typesOfLabelsService.list(page, size, search),
    placeholderData: keepPreviousData,
  })
}
