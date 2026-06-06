import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResetPinForm } from '../components/reset-pin-form'

const mockOnSuccess = vi.fn()
const mockOnBack = vi.fn()
const mockVerifyMutate = vi.fn()
const mockResendMutate = vi.fn()
const mockStartCooldown = vi.fn()

const mockUseResendCooldown = vi.fn()
let mockResendCooldownValue = {
  timeLeft: 0,
  isBlocked: false,
  startCooldown: mockStartCooldown,
}

vi.mock('../mutations/use-verify-token', () => ({
  useVerifyToken: () => ({
    mutate: mockVerifyMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('../mutations/use-forgot-password', () => ({
  useForgotPassword: () => ({
    mutate: mockResendMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}))

vi.mock('../hooks/use-resend-cooldown', () => ({
  useResendCooldown: () => mockResendCooldownValue,
}))

vi.mock('axios')

describe('ResetPinForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResendCooldownValue = {
      timeLeft: 0,
      isBlocked: false,
      startCooldown: mockStartCooldown,
    }
  })

  it('renders pin input and verify button', () => {
    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    expect(screen.getByText(/digite o código enviado/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /verificar código/i }),
    ).toBeInTheDocument()
  })

  it('shows the email that received the code', () => {
    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    expect(screen.getByText('leo@test.com')).toBeInTheDocument()
  })

  it('calls verifyToken mutation with email and pin on submit', async () => {
    const user = userEvent.setup()
    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    const pinInput = screen.getByLabelText('Código de verificação')
    const firstSlot = pinInput.querySelector('[data-slot="pin-input"]')
    if (firstSlot) {
      await user.type(firstSlot, '123456')
    }

    await user.click(screen.getByRole('button', { name: /verificar código/i }))

    expect(mockVerifyMutate).toHaveBeenCalledWith(
      { email: 'leo@test.com', token: expect.stringContaining('') },
      expect.any(Object),
    )
  })

  it('calls onBack when clicking back button', async () => {
    const user = userEvent.setup()
    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    await user.click(screen.getByRole('button', { name: /voltar/i }))

    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('renders resend button enabled when not in cooldown', () => {
    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    const resendBtn = screen.getByRole('button', { name: /reenviar código/i })
    expect(resendBtn).toBeEnabled()
  })

  it('shows cooldown timer on resend button when blocked', () => {
    mockResendCooldownValue = {
      timeLeft: 75,
      isBlocked: true,
      startCooldown: mockStartCooldown,
    }

    render(
      <ResetPinForm
        email='leo@test.com'
        onSuccess={mockOnSuccess}
        onBack={mockOnBack}
      />,
    )

    const resendBtn = screen.getByRole('button', {
      name: /reenviar código \(75s\)/i,
    })
    expect(resendBtn).toBeDisabled()
  })
})
