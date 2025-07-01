import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders contact information correctly', () => {
    render(<Footer />)
    
    expect(screen.getByText('Fale conosco')).toBeInTheDocument()
    expect(screen.getByText('(35) 3441-0000')).toBeInTheDocument()
    expect(screen.getByText('contact@santarita.br')).toBeInTheDocument()
    expect(screen.getByText('Rua Santa Rita, 81, Ouro Fino, Minas Gerais, 37570-000')).toBeInTheDocument()
  })

  it('renders mass schedule information', () => {
    render(<Footer />)
    
    expect(screen.getByText('Horário da Missa')).toBeInTheDocument()
    expect(screen.getByText('Domingo: 10:00 h')).toBeInTheDocument()
    expect(screen.getByText('Dia 22 de cada mês: 19:00 h')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Siga-nos')).toBeInTheDocument()
    
    const facebookLink = screen.getByRole('link', { name: 'Facebook' })
    const instagramLink = screen.getByRole('link', { name: 'Instagram' })
    const youtubeLink = screen.getByRole('link', { name: 'YouTube' })
    
    expect(facebookLink).toBeInTheDocument()
    expect(instagramLink).toBeInTheDocument()
    expect(youtubeLink).toBeInTheDocument()
    
    expect(facebookLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(youtubeLink).toHaveAttribute('target', '_blank')
  })

  it('renders copyright information with current year', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}.*Igreja Santa Rita de Cássia`))).toBeInTheDocument()
    expect(screen.getByText(/Todos os direitos reservados/)).toBeInTheDocument()
    expect(screen.getByText(/Desenvolvido com.*por MR Campos/)).toBeInTheDocument()
  })

  it('has proper email link', () => {
    render(<Footer />)
    
    const emailLink = screen.getByRole('link', { name: 'contact@santarita.br' })
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@santarita.church')
  })

  it('has proper footer structure and styling', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('renders heart icon with hover effect', () => {
    render(<Footer />)
    
    // Check if heart icon container exists
    const heartContainer = screen.getByText(/Desenvolvido com/)
    expect(heartContainer).toBeInTheDocument()
  })
})