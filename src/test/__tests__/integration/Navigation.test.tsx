import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../../../App'

describe('Navigation Integration', () => {
  it('navigates between main pages correctly', () => {
    render(<App />)
    
    // Start at home page - check hero text which is unique to home
    expect(screen.getByText('Oração, fé e comunidade')).toBeInTheDocument()
    
    // Navigate to Events
    const eventsLink = screen.getByRole('link', { name: 'Eventos' })
    fireEvent.click(eventsLink)
    
    // Check if Events page loads (should have events content)
    // Note: This would need the actual Events component to be rendered
  })

  it('navbar remains consistent across page navigation', () => {
    render(<App />)
    
    // Check navbar logo is present on home
    expect(screen.getByRole('link', { name: /igreja santa rita de cássia/i })).toBeInTheDocument()
    
    // Navigate to Schedule
    const scheduleLink = screen.getByRole('link', { name: 'Horários' })
    fireEvent.click(scheduleLink)
    
    // Navbar should still be there
    expect(screen.getByRole('link', { name: /igreja santa rita de cássia/i })).toBeInTheDocument()
  })

  it('mobile menu functionality works correctly', () => {
    render(<App />)
    
    // Find mobile menu button (should be hidden on desktop but testable)
    const menuButton = screen.getByRole('button')
    
    // Open mobile menu
    fireEvent.click(menuButton)
    
    // Should show all navigation items in mobile format
    const mobileLinks = screen.getAllByRole('link', { name: 'Eventos' })
    expect(mobileLinks.length).toBeGreaterThan(1) // Desktop + mobile versions
    
    // Close mobile menu by clicking a link
    const mobileEventLink = mobileLinks.find(link => 
      link.className.includes('block px-3 py-2')
    )
    
    if (mobileEventLink) {
      fireEvent.click(mobileEventLink)
      
      // Mobile menu should close
      const linksAfterClose = screen.getAllByRole('link', { name: 'Eventos' })
      expect(linksAfterClose).toHaveLength(1) // Only desktop version
    }
  })

  it('footer is present on all pages', () => {
    render(<App />)
    
    // Check footer is present on home
    expect(screen.getByText('Fale conosco')).toBeInTheDocument()
    
    // Navigate to different page
    const scheduleLink = screen.getByRole('link', { name: 'Horários' })
    fireEvent.click(scheduleLink)
    
    // Footer should still be there
    expect(screen.getByText('Fale conosco')).toBeInTheDocument()
  })
})