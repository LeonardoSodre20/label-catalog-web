import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResetPasswordForm } from '../components/reset-password-form'

const mockOnSuccess = vi.fn()
const mockOnBack = vi.fn()
const mockMutate = vi.fn()

vi.mock('../mutations/use-reset-password', () => ({
  useResetPassword: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('axios')

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders password fields and submit button', () => {
    render(
      <ResetPasswordForm
        email='leo@test.com'
        token='123456'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    expect(screen.getByLabelText(/nova senha/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /redefinir senha/i }),
    ).toBeInTheDocument()
  })

  it('calls mutate with email, token and passwords on valid submission', async () => {
    const user = userEvent.setup()
    render(
      <ResetPasswordForm
        email='leo@test.com'
        token='123456'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    await user.type(screen.getByLabelText(/nova senha/i), 'NewPass123!')
    await user.type(screen.getByLabelText(/confirmar senha/i), 'NewPass123!')
    await user.click(screen.getByRole('button', { name: /redefinir senha/i }))

    expect(mockMutate).toHaveBeenCalledWith(
      {
        email: 'leo@test.com',
        token: '123456',
        password: 'NewPass123!',
        confirmPassword: 'NewPass123!',
      },
      expect.any(Object),
    )
  })

  it('calls onBack when clicking back button', async () => {
    const user = userEvent.setup()
    render(
      <ResetPasswordForm
        email='leo@test.com'
        token='123456'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    await user.click(screen.getByRole('button', { name: /voltar/i }))

    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(
      <ResetPasswordForm
        email='leo@test.com'
        token='123456'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    const passwordInput = screen.getByLabelText(/nova senha/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    const toggleBtns = screen.getAllByRole('button', {
      name: /mostrar senha/i,
    })
    const firstToggle = toggleBtns[0]
    if (!firstToggle) throw new Error('Expected toggle button')
    await user.click(firstToggle)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })
})
