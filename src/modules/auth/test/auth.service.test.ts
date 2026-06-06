import { http } from '@/shared/api/http'
import { AuthService } from '../services/auth.service'

vi.mock('@/shared/api/http')

const service = new AuthService()
const mockLoginResponse = {
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    user: { id: '1', name: 'Leonardo', email: 'leo@test.com' },
  },
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls POST /auth/login with correct data and returns token and user', async () => {
    vi.mocked(http.post).mockResolvedValue(mockLoginResponse)

    const result = await service.login({
      email: 'leo@test.com',
      password: '123456',
    })

    expect(http.post).toHaveBeenCalledWith('/auth/login', {
      email: 'leo@test.com',
      password: '123456',
    })
    expect(result.token).toBe(mockLoginResponse.data.token)
    expect(result.user.name).toBe('Leonardo')
  })

  it('throws when API returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Network Error'))

    await expect(
      service.login({ email: 'leo@test.com', password: '123456' }),
    ).rejects.toThrow('Network Error')
  })
})
