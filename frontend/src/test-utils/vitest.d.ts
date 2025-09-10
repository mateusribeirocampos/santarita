/// <reference types="vitest/globals" />

// Declarações globais para Vitest
import 'vitest/globals'

// Declarações adicionais para @testing-library/jest-dom
import '@testing-library/jest-dom'

// Tipos globais específicos do Vitest
declare global {
  // Mock do import.meta.env para testes
  namespace ImportMeta {
    interface Env {
      VITE_API_URL?: string
      MODE?: string
      DEV?: boolean
      PROD?: boolean
      SSR?: boolean
    }
  }
}