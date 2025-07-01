import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navbar from '../Navbar'

const NavbarWrapper = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
)

describe('Navbar', () => {
  it('renders church name and logo', () => {
    render(<NavbarWrapper />)
    
    expect(screen.getByText('Igreja Santa Rita de Cássia')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /igreja santa rita de cássia/i })).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<NavbarWrapper />)
    
    const expectedLinks = ['Inicial', 'Eventos', 'Horários', 'Notícias', 'Igreja', 'Santa Rita', 'Dízimo']
    
    expectedLinks.forEach(linkText => {
      expect(screen.getByRole('link', { name: linkText })).toBeInTheDocument()
    })
  })

  it('shows mobile menu when hamburger button is clicked', () => {
    render(<NavbarWrapper />)
    
    // Mobile menu should be hidden initially
    const mobileLinks = screen.queryAllByRole('link', { name: 'Inicial' })
    expect(mobileLinks).toHaveLength(1) // Only desktop version visible
    
    // Click hamburger button
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Mobile menu should be visible
    const mobileLinksAfterClick = screen.getAllByRole('link', { name: 'Inicial' })
    expect(mobileLinksAfterClick).toHaveLength(2) // Both desktop and mobile versions
  })

  it('hides mobile menu when X button is clicked', () => {
    render(<NavbarWrapper />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Click X button to close
    fireEvent.click(menuButton)
    
    // Mobile menu should be hidden
    const mobileLinks = screen.queryAllByRole('link', { name: 'Inicial' })
    expect(mobileLinks).toHaveLength(1) // Only desktop version visible
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<NavbarWrapper />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Click on a mobile link
    const mobileLinks = screen.getAllByRole('link', { name: 'Eventos' })
    const mobileEventLink = mobileLinks.find(link => 
      link.className.includes('block px-3 py-2')
    )
    
    if (mobileEventLink) {
      fireEvent.click(mobileEventLink)
    }
    
    // Mobile menu should be closed
    const linksAfterClose = screen.queryAllByRole('link', { name: 'Inicial' })
    expect(linksAfterClose).toHaveLength(1) // Only desktop version visible
  })

  it('has correct navigation structure', () => {
    render(<NavbarWrapper />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('bg-white', 'shadow-lg')
  })
})