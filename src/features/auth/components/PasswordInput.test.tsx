import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('renders password input with aria-label="Password"', () => {
    render(
      <PasswordInput value="" onChange={() => {}} showRequirements={false} />,
    )

    const input = screen.getByLabelText('Password')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('calls onChange when user types into the input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <PasswordInput
        value=""
        onChange={handleChange}
        showRequirements={false}
      />,
    )

    const input = screen.getByLabelText('Password')
    await user.type(input, 'a')

    expect(handleChange).toHaveBeenCalled()
  })

  it('toggles password visibility when toggle button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <PasswordInput
        value="SecretPass123!"
        onChange={() => {}}
        showRequirements={false}
      />,
    )

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')

    const toggleButton = screen.getByRole('button')
    await user.click(toggleButton)

    expect(input).toHaveAttribute('type', 'text')

    await user.click(toggleButton)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('displays requirements when showRequirements is true', () => {
    render(<PasswordInput value="" onChange={() => {}} showRequirements={true} />)

    expect(screen.getByText(/12.*characters/i)).toBeInTheDocument()
    expect(screen.getByText(/uppercase/i)).toBeInTheDocument()
    expect(screen.getByText(/lowercase/i)).toBeInTheDocument()
    expect(screen.getByText(/number/i)).toBeInTheDocument()
    expect(screen.getByText(/special/i)).toBeInTheDocument()
  })

  it('does not display requirements when showRequirements is false', () => {
    render(
      <PasswordInput value="" onChange={() => {}} showRequirements={false} />,
    )

    expect(screen.queryByText(/12.*characters/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/uppercase/i)).not.toBeInTheDocument()
  })

  it('displays the strength indicator', () => {
    render(
      <PasswordInput
        value="ValidSecret123!"
        onChange={() => {}}
        showRequirements={false}
      />,
    )

    expect(screen.getByText(/medium|strong|weak/i)).toBeInTheDocument()
  })
})
