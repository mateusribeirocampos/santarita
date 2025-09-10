# Testes - Igreja Santa Rita Frontend

Este diretório contém todos os testes automatizados do frontend da aplicação Igreja Santa Rita.

## Estrutura

```
src/__tests__/
├── README.md              # Este arquivo
├── components/            # Testes para componentes React
│   └── ImageUpload.test.tsx
├── hooks/                 # Testes para hooks customizados
├── pages/                 # Testes para páginas/rotas
├── utils/                 # Testes para funções utilitárias
│   └── imageUtils.test.ts
└── setup.ts              # Configuração global dos testes
```

## Tecnologias Utilizadas

- **Vitest**: Framework de testes rápido e moderno
- **@testing-library/react**: Biblioteca para testes de componentes React
- **@testing-library/user-event**: Simulação de interações do usuário
- **jsdom**: Ambiente DOM para testes

## Scripts de Teste

```bash
# Executar todos os testes
npm test

# Executar testes com interface gráfica
npm run test:ui

# Executar testes com coverage
npm run test:coverage

# Executar testes uma vez (CI/CD)
npm run test:run
```

## Testes de Segurança

### `utils/imageUtils.test.ts`

Testa as funções de sanitização de URLs de imagem para prevenir vulnerabilidades XSS:

- **`getSafeImageUrl`**: Sanitização rigorosa de URLs
- **`getSafeImageUrlWithFallback`**: URL segura com fallback
- **`isImageUrlSafe`**: Validação de segurança de URLs

**Casos testados:**
- ✅ URLs seguras (caminhos relativos válidos)
- ❌ Protocolos perigosos (`javascript:`, `data:`, `vbscript:`)
- ❌ Caracteres HTML maliciosos
- ❌ Path traversal attacks
- ✅ URLs absolutas válidas do backend

### `components/ImageUpload.test.tsx`

Testa o componente crítico de upload de imagens:

- **Renderização**: Estados com/sem imagem
- **Validação**: Tipo e tamanho de arquivo
- **Segurança**: Autenticação necessária
- **UX**: Loading states e feedback de erro
- **Interações**: Upload e remoção de imagens

## Executando os Testes

### Localmente

```bash
# Executar todos os testes
npm test

# Com coverage (recomendado antes de commit)
npm run test:coverage
```

### Com Interface Visual

```bash
# Abre interface web para testes
npm run test:ui
```

## Convenções

### Nomenclatura
- Arquivos de teste: `*.test.ts` ou `*.test.tsx`
- Localização: `src/__tests__/[categoria]/[componente].test.ts`

### Estrutura dos Testes
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  });

  it('should do something specific', () => {
    // Arrange
    // Act  
    // Assert
  });
});
```

### Mocks
- Mocks de serviços: `vi.mock('../../services/serviceName')`
- Mocks globais: Definidos em `setup.ts`
- Cleanup: `vi.clearAllMocks()` no `beforeEach`

## Cobertura de Testes

Objetivo: **80%+ de cobertura** nas funções críticas

### Prioridades por Categoria:
1. **Segurança** (100%): Funções de sanitização, autenticação
2. **Componentes Críticos** (90%): Upload, forms, auth
3. **Utils** (80%): Funções utilitárias
4. **Páginas** (60%): Componentes de apresentação

## Adicionando Novos Testes

### Para Componentes:
1. Criar arquivo em `src/__tests__/components/`
2. Testar renderização, props, interações
3. Mockar dependências externas
4. Testar casos de erro

### Para Utilitários:
1. Criar arquivo em `src/__tests__/utils/`
2. Testar inputs válidos/inválidos
3. Testar edge cases
4. Validar outputs esperados

### Para Hooks:
1. Criar arquivo em `src/__tests__/hooks/`
2. Usar `renderHook` do testing-library
3. Testar estado inicial e mudanças
4. Mockar dependências (APIs, etc.)

## Integração CI/CD

Os testes são executados automaticamente em:
- **Pull Requests**: Validação antes do merge
- **Commits**: Pre-commit hooks (futuro)
- **Deploy**: Validação antes da produção

## Recursos Úteis

- [Vitest Docs](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Status**: ✅ Sistema de testes configurado e funcionando  
**Cobertura Atual**: Funções de segurança XSS + ImageUpload  
**Próximos Passos**: Expandir cobertura para hooks e páginas críticas