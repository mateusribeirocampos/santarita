import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from '../Home'

const HomeWrapper = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)

describe('Home', () => {
  it('renders hero section with church name and slogan', () => {
    render(<HomeWrapper />)
    
    expect(screen.getByText('Igreja Santa Rita de Cássia')).toBeInTheDocument()
    expect(screen.getByText('Oração, fé e comunidade')).toBeInTheDocument()
  })

  it('renders quick links to main sections', () => {
    render(<HomeWrapper />)
    
    // Check for Events link
    const eventsLink = screen.getByRole('link', { name: /eventos/i })
    expect(eventsLink).toBeInTheDocument()
    expect(eventsLink).toHaveAttribute('href', '/events')
    
    // Check for Schedule link
    const scheduleLink = screen.getByRole('link', { name: /horário da missa/i })
    expect(scheduleLink).toBeInTheDocument()
    expect(scheduleLink).toHaveAttribute('href', '/schedule')
  })

  it('displays quick links with proper descriptions', () => {
    render(<HomeWrapper />)
    
    expect(screen.getByText('Junte-se a nós para celebrações especiais e reuniões comunitárias')).toBeInTheDocument()
    expect(screen.getByText('Veja nossos horários regulares de missa e serviços especiais')).toBeInTheDocument()
  })

  it('has proper hero section styling', () => {
    render(<HomeWrapper />)
    
    const heroSection = screen.getByText('Igreja Santa Rita de Cássia').closest('div')
    expect(heroSection).toHaveClass('text-center', 'text-white')
  })

  it('renders with proper page structure', () => {
    render(<HomeWrapper />)
    
    // Check if main container exists
    const mainContainer = screen.getByText('Igreja Santa Rita de Cássia').closest('.space-y-12')
    expect(mainContainer).toBeInTheDocument()
  })
})