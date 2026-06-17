import { http } from '@/shared/api/http'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

vi.mock('@/shared/api/http')

const service = new TypesOfLabelsService()

const mockType = {
  id: 1,
  name: 'Peça',
  description: 'Componente para montagem',
  createdAt: '2026-06-08T10:00:00',
  updatedAt: '2026-06-08T10:00:00',
}

const mockPaginatedResponse = {
  data: {
    content: [mockType],
    totalPages: 1,
    totalElements: 1,
    number: 0,
    size: 20,
    empty: false,
  },
}

describe('TypesOfLabelsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls GET /types-of-labels with page and size params', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    const result = await service.list(0, 20)

    expect(http.get).toHaveBeenCalledWith('/types-of-labels', {
      params: { page: 0, size: 20 },
    })
    expect(result.content).toHaveLength(1)
    expect(result.content[0]?.name).toBe('Peça')
  })

  it('passes search param when provided', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    await service.list(0, 20, 'Peça')

    expect(http.get).toHaveBeenCalledWith('/types-of-labels', {
      params: { page: 0, size: 20, search: 'Peça' },
    })
  })

  it('returns empty paginated response when no types exist', async () => {
    const emptyResponse = {
      data: {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 20,
        empty: true,
      },
    }
    vi.mocked(http.get).mockResolvedValue(emptyResponse)

    const result = await service.list(0, 20)

    expect(result.content).toHaveLength(0)
    expect(result.empty).toBe(true)
  })

  it('throws when list API returns an error', async () => {
    vi.mocked(http.get).mockRejectedValue(new Error('Network Error'))

    await expect(service.list(0, 20)).rejects.toThrow('Network Error')
  })

  it('calls GET /types-of-labels/:id and returns type', async () => {
    const mockResponse = { data: mockType }
    vi.mocked(http.get).mockResolvedValue(mockResponse)

    const result = await service.getById(1)

    expect(http.get).toHaveBeenCalledWith('/types-of-labels/1')
    expect(result.name).toBe('Peça')
  })

  it('throws when getById returns an error', async () => {
    vi.mocked(http.get).mockRejectedValue(new Error('Type not found'))

    await expect(service.getById(999)).rejects.toThrow('Type not found')
  })

  it('calls POST /types-of-labels with create data', async () => {
    const createResponse = { data: mockType }
    vi.mocked(http.post).mockResolvedValue(createResponse)

    const result = await service.create({
      name: 'Peça',
      description: 'Componente para montagem',
    })

    expect(http.post).toHaveBeenCalledWith('/types-of-labels', {
      name: 'Peça',
      description: 'Componente para montagem',
    })
    expect(result.name).toBe('Peça')
  })

  it('calls POST /types-of-labels with minimal data', async () => {
    const response = { data: { ...mockType, description: null } }
    vi.mocked(http.post).mockResolvedValue(response)

    const result = await service.create({ name: 'Peça' })

    expect(http.post).toHaveBeenCalledWith('/types-of-labels', {
      name: 'Peça',
    })
    expect(result.name).toBe('Peça')
  })

  it('throws when create API returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Name already exists'))

    await expect(service.create({ name: 'Peça' })).rejects.toThrow(
      'Name already exists',
    )
  })

  it('calls PUT /types-of-labels/:id with update data', async () => {
    const updateResponse = { data: { ...mockType, description: 'Updated' } }
    vi.mocked(http.put).mockResolvedValue(updateResponse)

    const result = await service.update(1, {
      name: 'Peça',
      description: 'Updated',
    })

    expect(http.put).toHaveBeenCalledWith('/types-of-labels/1', {
      name: 'Peça',
      description: 'Updated',
    })
    expect(result.description).toBe('Updated')
  })

  it('throws when update API returns an error', async () => {
    vi.mocked(http.put).mockRejectedValue(new Error('Update failed'))

    await expect(service.update(1, { name: 'Peça' })).rejects.toThrow(
      'Update failed',
    )
  })

  it('calls DELETE /types-of-labels/:id', async () => {
    vi.mocked(http.delete).mockResolvedValue({})

    await service.delete(1)

    expect(http.delete).toHaveBeenCalledWith('/types-of-labels/1')
  })

  it('throws when delete API returns an error', async () => {
    vi.mocked(http.delete).mockRejectedValue(new Error('Type not found'))

    await expect(service.delete(999)).rejects.toThrow('Type not found')
  })
})
