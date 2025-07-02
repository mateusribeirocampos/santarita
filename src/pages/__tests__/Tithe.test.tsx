import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Tithe from '../Tithe'

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() => Promise.resolve({
    redirectToCheckout: vi.fn()
  }))
}))

// Mock alert
const mockAlert = vi.fn()
global.alert = mockAlert

describe('Tithe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders donation page with title and description', () => {
    render(<Tithe />)
    
    expect(screen.getByText('Apoie nossa Igreja')).toBeInTheDocument()
    expect(screen.getByText(/Seus generosos dízimos nos ajudam a manter nossa igreja/)).toBeInTheDocument()
  })

  it('renders predefined amount buttons', () => {
    render(<Tithe />)
    
    expect(screen.getByRole('button', { name: 'R$ 10' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'R$ 25' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'R$ 50' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'R$ 100' })).toBeInTheDocument()
  })

  it('allows selecting predefined amounts', () => {
    render(<Tithe />)
    
    const amount25Button = screen.getByRole('button', { name: 'R$ 25' })
    fireEvent.click(amount25Button)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    expect(input).toHaveValue(25)
  })

  it('allows typing custom amount', () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '75' } })
    
    expect(input).toHaveValue(75)
  })

  it('renders donation type buttons', () => {
    render(<Tithe />)
    
    expect(screen.getByRole('button', { name: 'Uma vez' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mensal' })).toBeInTheDocument()
  })

  it('allows selecting donation type', () => {
    render(<Tithe />)
    
    const monthlyButton = screen.getByRole('button', { name: 'Mensal' })
    fireEvent.click(monthlyButton)
    
    // Check if monthly button gets selected styling (border-blue-700 bg-blue-50)
    expect(monthlyButton).toHaveClass('border-blue-700', 'bg-blue-50', 'text-blue-700')
  })

  it('updates donation button text with amount', () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '50' } })
    
    expect(screen.getByText('Dízimo R$ 50')).toBeInTheDocument()
  })

  it('disables donation button when no amount is entered', () => {
    render(<Tithe />)
    
    const donateButton = screen.getByRole('button', { name: /Dízimo R\$/ })
    expect(donateButton).toBeDisabled()
  })

  it('enables donation button when amount is entered', () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '25' } })
    
    const donateButton = screen.getByRole('button', { name: 'Dízimo R$ 25' })
    expect(donateButton).not.toBeDisabled()
  })

  it('shows alert for invalid amount', async () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '0' } })
    
    const donateButton = screen.getByRole('button', { name: 'Dízimo R$ 0' })
    fireEvent.click(donateButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Por favor, insira um valor válido')
    })
  })

  it('shows alert for negative amount', async () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '-10' } })
    
    const donateButton = screen.getByRole('button', { name: 'Dízimo R$ -10' })
    fireEvent.click(donateButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Por favor, insira um valor válido')
    })
  })

  it('processes donation with valid amount', async () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '50' } })
    
    const donateButton = screen.getByRole('button', { name: 'Dízimo R$ 50' })
    fireEvent.click(donateButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        expect.stringContaining('Em uma implementação real, você seria redirecionado para o Stripe Checkout para pagar R$ 50 como dízimo único')
      )
    })
  })

  it('processes monthly donation correctly', async () => {
    render(<Tithe />)
    
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    fireEvent.change(input, { target: { value: '30' } })
    
    const monthlyButton = screen.getByRole('button', { name: 'Mensal' })
    fireEvent.click(monthlyButton)
    
    const donateButton = screen.getByRole('button', { name: 'Dízimo R$ 30' })
    fireEvent.click(donateButton)
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        expect.stringContaining('Em uma implementação real, você seria redirecionado para o Stripe Checkout para pagar R$ 30 como dízimo mensal')
      )
    })
  })

  it('renders alternative donation methods', () => {
    render(<Tithe />)
    
    expect(screen.getByText('Outras maneiras de fazer o dízimo')).toBeInTheDocument()
    expect(screen.getByText('Por Pix')).toBeInTheDocument()
    expect(screen.getByText('Em pessoa')).toBeInTheDocument()
    expect(screen.getByText(/Coloque seu dízimo na cesta de coleta/)).toBeInTheDocument()
  })

  it('shows Stripe security notice', () => {
    render(<Tithe />)
    
    expect(screen.getByText('Pagamentos seguros processados por Stripe')).toBeInTheDocument()
  })

  it('shows contact information', () => {
    render(<Tithe />)
    
    expect(screen.getByText(/Para mais informações, entre em contato com a secretaria paroquial/)).toBeInTheDocument()
  })

  it('has proper form structure', () => {
    render(<Tithe />)
    
    // Check for main sections
    expect(screen.getByText('Selecione o valor')).toBeInTheDocument()
    expect(screen.getByText('Selecione o tipo de dízimo')).toBeInTheDocument()
    
    // Check input has proper attributes
    const input = screen.getByPlaceholderText(/Entre com o valor que deseja/)
    expect(input).toHaveAttribute('type', 'number')
  })
})