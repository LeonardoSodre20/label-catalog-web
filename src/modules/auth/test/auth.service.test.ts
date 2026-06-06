import { http } from '@/shared/api/http'
import { AuthService } from '../services/auth.service'

vi.mock('@/shared/api/http')

const service = new AuthService()
const mockLoginResponse = {
  data: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    type: 'Bearer',
    email: 'leo@test.com',
    function: 'ADMIN',
  },
}

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls POST /auth/login with correct data and returns token', async () => {
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
    expect(result.email).toBe('leo@test.com')
    expect(result.function).toBe('ADMIN')
  })

  it('throws when API returns an error', async () => {
    vi.mocked(http.post).mockRejectedValue(new Error('Network Error'))

    await expect(
      service.login({ email: 'leo@test.com', password: '123456' }),
    ).rejects.toThrow('Network Error')
  })
})
