import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ForgotPasswordForm } from '../components/forgot-password-form'

const mockOnSuccess = vi.fn()
const mockOnBackToLogin = vi.fn()
const mockMutate = vi.fn()

vi.mock('../mutations/use-forgot-password', () => ({
  useForgotPassword: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('axios')

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email field and submit button', () => {
    render(
      <ForgotPasswordForm
        onSuccess={mockOnSuccess}
        onBackToLogin={mockOnBackToLogin}
      />,
    )

    expect(screen.getByLabelText(/e-?mail/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /enviar código/i }),
    ).toBeInTheDocument()
  })

  it('calls mutate with email on valid submission', async () => {
    const user = userEvent.setup()
    render(
      <ForgotPasswordForm
        onSuccess={mockOnSuccess}
        onBackToLogin={mockOnBackToLogin}
      />,
    )

    await user.type(screen.getByLabelText(/e-?mail/i), 'leo@test.com')
    await user.click(screen.getByRole('button', { name: /enviar código/i }))

    expect(mockMutate).toHaveBeenCalledWith(
      { email: 'leo@test.com' },
      expect.any(Object),
    )
  })

  it('calls onBackToLogin when clicking back button', async () => {
    const user = userEvent.setup()
    render(
      <ForgotPasswordForm
        onSuccess={mockOnSuccess}
        onBackToLogin={mockOnBackToLogin}
      />,
    )

    await user.click(screen.getByRole('button', { name: /voltar ao login/i }))

    expect(mockOnBackToLogin).toHaveBeenCalledTimes(1)
  })
})
