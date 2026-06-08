import { http } from '@/shared/api/http'
import { UsersService } from '../services/users.service'

vi.mock('@/shared/api/http')

const service = new UsersService()

const mockUser = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  function: 'ADMIN',
  firstAccess: true,
  createdAt: '2026-06-08T10:00:00',
}

const mockPaginatedResponse = {
  data: {
    content: [mockUser],
    totalPages: 1,
    totalElements: 1,
    number: 0,
    size: 20,
    empty: false,
  },
}

describe('UsersService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls GET /users with page and size params', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    const result = await service.list(0, 20)

    expect(http.get).toHaveBeenCalledWith('/users', {
      params: { page: 0, size: 20 },
    })
    expect(result.content).toHaveLength(1)
    expect(result.content[0]?.name).toBe('João Silva')
    expect(result.content[0]?.function).toBe('ADMIN')
    expect(result.content[0]?.firstAccess).toBe(true)
  })

  it('calls GET /users with search param', async () => {
    vi.mocked(http.get).mockResolvedValue(mockPaginatedResponse)

    await service.list(0, 20, 'ADMIN')

    expect(http.get).toHaveBeenCalledWith('/users', {
      params: { page: 0, size: 20, search: 'ADMIN' },
    })
  })

  it('returns empty paginated response when no users', async () => {
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

  it('calls POST /users with create data', async () => {
    const createResponse = { data: mockUser }
    vi.mocked(http.post).mockResolvedValue(createResponse)

    const result = await service.create({
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'ADMIN',
    })

    expect(http.post).toHaveBeenCalledWith('/users', {
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'ADMIN',
    })
    expect(result.name).toBe('João Silva')
    expect(result.function).toBe('ADMIN')
  })

  it('throws when create API returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Email already exists'))

    await expect(
      service.create({
        name: 'João Silva',
        email: 'joao@example.com',
        function: 'ADMIN',
      }),
    ).rejects.toThrow('Email already exists')
  })

  it('calls PUT /users/:id with update data', async () => {
    const updateResponse = { data: { ...mockUser, function: 'OPERATOR' } }
    vi.mocked(http.put).mockResolvedValue(updateResponse)

    const result = await service.update(1, {
      name: 'João Silva',
      function: 'OPERATOR',
    })

    expect(http.put).toHaveBeenCalledWith('/users/1', {
      name: 'João Silva',
      function: 'OPERATOR',
    })
    expect(result.function).toBe('OPERATOR')
  })

  it('throws when update API returns an error', async () => {
    vi.mocked(http.put).mockRejectedValue(new Error('Update failed'))

    await expect(
      service.update(1, {
        name: 'João Silva',
        function: 'ADMIN',
      }),
    ).rejects.toThrow('Update failed')
  })

  it('calls DELETE /users with ids array', async () => {
    vi.mocked(http.delete).mockResolvedValue({})

    await service.delete([1, 2, 3])

    expect(http.delete).toHaveBeenCalledWith('/users', {
      data: { ids: [1, 2, 3] },
    })
  })

  it('throws when delete API returns an error', async () => {
    vi.mocked(http.delete).mockRejectedValue(new Error('Users not found'))

    await expect(service.delete([999])).rejects.toThrow('Users not found')
  })
})
