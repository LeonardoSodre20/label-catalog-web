import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../components/login-form'

const mockNavigate = vi.fn()
const mockMutate = vi.fn()
const mockSetSession = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}))

vi.mock('../mutations/use-login', () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('@/shared/stores/auth-store', () => ({
  useAuthStore: (selector: (state: unknown) => unknown) =>
    selector({ setSession: mockSetSession }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/e-?mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  })

  it('renders submit button disabled by default', () => {
    render(<LoginForm />)

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })

  it('shows validation error when email is invalid on blur', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByLabelText(/e-?mail/i)
    await user.type(emailInput, 'invalido')
    await user.tab()

    expect(await screen.findByText(/e-mail inválido/i)).toBeInTheDocument()
  })

  it('shows validation error when password is too short on blur', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText('Senha')
    await user.type(passwordInput, '123')
    await user.tab()

    expect(
      await screen.findByText(/pelo menos 6 caracteres/i),
    ).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText('Senha')
    expect(passwordInput).toHaveAttribute('type', 'password')

    const toggleButton = screen.getByRole('button', { name: /mostrar senha/i })
    await user.click(toggleButton)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  it('navigates to reset-password when clicking forgot password link', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const forgotLink = screen.getByRole('button', {
      name: /esqueci minha senha/i,
    })
    await user.click(forgotLink)

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/reset-password' })
  })

  it('submits form programmatically triggers mutate', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/e-?mail/i), 'leo@test.com')
    await user.type(screen.getByLabelText('Senha'), '123456')
    await user.tab()

    const submitBtn = screen.getByRole('button', { name: /entrar/i })
    expect(submitBtn).toBeEnabled()

    await user.click(submitBtn)

    expect(mockMutate).toHaveBeenCalledWith(
      { email: 'leo@test.com', password: '123456' },
      expect.any(Object),
    )
  })
})
