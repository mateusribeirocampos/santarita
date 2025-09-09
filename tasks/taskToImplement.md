# Roadmap - Igreja Santa Rita

Este documento contém as próximas funcionalidades e melhorias planejadas para o projeto.

## ✅ CONCLUÍDO

### ~~1. Sistema Base~~ ✅

- ✅ Framework de testes (Vitest + React Testing Library)
- ✅ Pipeline de deploy (Vercel + Render)
- ✅ Configuração de variáveis de ambiente
- ✅ Headers de segurança básicos
- ✅ Autenticação completa (JWT + bcrypt)
- ✅ CRUD completo (Eventos, Notícias, Upload)
- ✅ APIs REST funcionais
- ✅ Rate limiting implementado
- ✅ CORS configurado para produção

### ~~2. Deploy e Infraestrutura~~ ✅

- ✅ Frontend deployado na Vercel
- ✅ Backend deployado no Render  
- ✅ Database no Supabase
- ✅ Auto-deploy configurado
- ✅ Variáveis de ambiente em produção

### ~~3. Correções UX 2025-07-10~~ ✅

- ✅ Preview de imagem em formulários corrigido
- ✅ Exibição consistente de fotos em detalhes
- ✅ Sanitização de URLs atualizada para produção
- ✅ Componentes ImageUpload e EventDetail corrigidos

## 🟡 PRÓXIMAS IMPLEMENTAÇÕES

### 4. 🔥 URGENTE - Persistência de Imagens no Banco de Dados

**⚠️ PROBLEMA CRÍTICO:** Render.com não persiste arquivos entre deployments

#### **Análise do Problema Atual:**
- ❌ Render.com **não persiste arquivos** entre deployments
- ❌ Imagens salvas em `/uploads/` são **perdidas** a cada redeploy
- ❌ URLs quebradas: `"https://santa-rita-backend.onrender.comundefined"`
- ✅ **Correção aplicada:** URLs agora funcionam para novas imagens
- ⚠️ **Limitação:** Imagens antigas continuam perdidas

#### **Soluções Propostas:**

##### **🥇 OPÇÃO 1: Supabase Storage (Recomendada)**
**Duração estimada: 3-4 horas**

**Vantagens:**
- ✅ **Persistência garantida** - CDN integrada + performance otimizada
- ✅ **Aproveitamento da infraestrutura** - já usamos Supabase para PostgreSQL
- ✅ **URLs persistentes** - nunca se perdem
- ✅ **Gestão automática** - redimensionamento, compressão
- ✅ **Políticas RLS** - segurança integrada

**Implementação:**
```typescript
// 1. Configurar bucket no Supabase Dashboard
// 2. Service de upload
export class SupabaseImageService {
  async uploadImage(file: Express.Multer.File, eventId: string) {
    const { data, error } = await supabase.storage
      .from('event-images')
      .upload(`events/${eventId}/${file.filename}`, file.buffer);
    
    return supabase.storage.from('event-images').getPublicUrl(data.path);
  }
}
```

##### **🥈 OPÇÃO 2: PostgreSQL BYTEA**
**Duração estimada: 5-6 horas**

**Vantagens:**
- ✅ **Controle total** dos dados
- ✅ **Sem custos adicionais**
- ✅ **Backup automático** junto com dados
- ✅ **Transações ACID** - imagem e evento salvos juntos

**Schema Prisma:**
```prisma
model Event {
  // ... campos existentes
  image           String?   // URL legacy (compatibilidade)
  imageData       Bytes?    // Dados binários da imagem
  imageMimeType   String?   // image/jpeg, image/png, etc
  imageFilename   String?   // nome original do arquivo
  imageSize       Int?      // tamanho em bytes
}
```

#### **📋 Checklist de Implementação:**

**Fase 1: Backend (2-3h)**
- [ ] Escolher solução (Supabase Storage vs PostgreSQL BYTEA)
- [ ] Configurar environment variables
- [ ] Criar service de storage
- [ ] Atualizar upload controller
- [ ] Criar endpoints para servir imagens

**Fase 2: Frontend (1-2h)**
- [ ] Atualizar componente ImageUpload
- [ ] Modificar URLs de imagem
- [ ] Implementar preview Base64 (se PostgreSQL)
- [ ] Testar upload e display

**Fase 3: Migration (1h)**
- [ ] Testar persistência através de deployments
- [ ] Migração gradual (manter compatibilidade)
- [ ] Documentar novo sistema

#### **💰 Comparação de Custos:**

| Critério | PostgreSQL BYTEA | Supabase Storage | AWS S3/Cloudinary |
|----------|------------------|------------------|-------------------|
| **Implementação** | 🟡 Complexa | 🟢 Simples | 🔴 Muito complexa |
| **Performance** | 🟡 Média | 🟢 Ótima | 🟢 Ótima |
| **Custo** | 🟢 Gratuito | 🟢 Gratuito (até 1GB) | 🟡 Pago |
| **Manutenção** | 🟡 Alta | 🟢 Baixa | 🟡 Média |

**Status:** 📋 **PLANEJAMENTO COMPLETO**  
**Prioridade:** 🔥 **ALTA** - Resolve problema crítico de persistência  
**Impacto:** ⭐⭐⭐⭐⭐ - Essencial para funcionamento adequado do sistema

---

### 5. Melhorias de Performance

- [ ] **Code Splitting e Lazy Loading**
  - Implementar lazy loading para rotas
  - Configurar dynamic imports
  - Otimizar bundle size

- [ ] **Otimização de Imagens**
  - Integração com Cloudinary ou Vercel Blob
  - Suporte a WebP e AVIF
  - Lazy loading de imagens
  - Compressão automática

- [ ] **Caching Strategy**
  - Cache de API responses no frontend
  - Otimizar static assets caching
  - Implementar service worker básico

### 6. SEO e Analytics

- [ ] **SEO Optimization**
  - Meta tags dinâmicos por página
  - Open Graph tags
  - Schema markup para organização religiosa
  - Sitemap.xml automático

- [ ] **Analytics e Monitoramento**
  - Google Analytics 4
  - Eventos customizados (doações, navegação)
  - Error monitoring (Sentry ou similar)
  - Performance monitoring

### 7. Melhorias de UX/UI

- [ ] **Accessibility (A11y)**
  - Audit de acessibilidade
  - ARIA labels
  - Navegação por teclado
  - Contraste adequado

- [ ] **Loading States Melhorados**
  - Skeleton components
  - Error boundaries
  - Toast notifications
  - Progress indicators

- [ ] **Form Improvements**
  - React Hook Form implementation
  - Validação em tempo real
  - Auto-save drafts
  - Better error feedback

## 🔄 Funcionalidades Futuras

### 8. Sistema de Newsletter

- [ ] **Newsletter Completo**
  - Formulário de inscrição funcional
  - Sistema de envio de emails
  - Templates de email
  - Gestão de inscritos

### 9. Sistema de Notícias Automatizado

- [ ] **Scraping de Notícias do Vaticano**
  - Web scraping do site oficial do Vaticano (vatican.va)
  - Sistema de tradução automática (Google Translate API ou similar)
  - Processamento e resumo de conteúdo com IA
  - Inserção automática mensal no banco de dados
  - Categorização automática das notícias
  - Filtros de relevância e qualidade
  - Sistema de moderação prévia
  - Agendamento via cron jobs

- [ ] **Processamento de Conteúdo IA**
  - Integração com OpenAI API ou similar
  - Sumarização inteligente de artigos longos
  - Detecção de temas e tags automáticas
  - Verificação de conteúdo apropriado
  - Otimização para SEO automática

### 10. Chatbot com Inteligência Artificial

- [ ] **Chatbot Interativo**
  - Integração com OpenAI GPT ou similar
  - Interface de chat flutuante no site
  - Base de conhecimento sobre a igreja
  - Respostas sobre horários, eventos e serviços
  - Integração com FAQ dinâmica
  - Suporte a múltiplos idiomas
  - Histórico de conversas (opcional)
  - Analytics de interações

- [ ] **Funcionalidades do Chatbot**
  - Informações sobre horários de missa
  - Agendamento de sacramentos
  - Orientações sobre doações
  - Informações sobre eventos próximos
  - Perguntas sobre a fé católica
  - Direcionamento para contato humano
  - Integração com sistema de newsletter
  - Notificações proativas

- [ ] **Configuração e Treinamento**
  - Base de dados de perguntas frequentes
  - Treinamento com conteúdo específico da igreja
  - Personalização de respostas
  - Sistema de fallback para operador humano
  - Métricas de satisfação do usuário
  - Aprendizado contínuo baseado em interações

### 11. Funcionalidades Avançadas

- [ ] **PWA (Progressive Web App)**
  - Service worker completo
  - Offline functionality
  - App manifest
  - Push notifications

- [ ] **Sistema de Comentários**
  - Comentários em notícias
  - Moderação de comentários
  - Sistema de likes
  - Integração com redes sociais

## 📋 Prioridade Baixa

### 12. Advanced Features (EN)

- [ ] **PWA (Progressive Web App)**
  - Configurar service worker
  - Implementar offline functionality
  - Adicionar app manifest

- [ ] **Internacionalização (i18n)**
  - Configurar react-i18next
  - Criar traduções para português/inglês
  - Implementar locale detection

- [ ] **CMS Integration**
  - Avaliar Strapi ou Contentful
  - Implementar gestão de conteúdo dinâmico
  - Criar admin panel simples

### 13. Developer Experience

- [ ] **Documentation**
  - Melhorar README com setup detalhado
  - Criar guia de contribuição
  - Documentar APIs e componentes

- [ ] **Tooling**
  - Configurar Prettier
  - Implementar Husky para pre-commit hooks
  - Adicionar commit linting (Conventional Commits)

- [ ] **Code Quality**
  - Configurar SonarQube ou Code Climate
  - Implementar dependency vulnerability scanning
  - Adicionar performance budgets

## 📊 Métricas de Sucesso

### Testes

- [ ] Cobertura de testes > 80%
- [ ] Zero falhas em CI/CD pipeline
- [ ] Tempo de build < 2 minutos

### Performance

- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Segurança

- [ ] Security headers configurados
- [ ] Zero vulnerabilidades high/critical
- [ ] HTTPS enforced
- [ ] CSP sem violations

### SEO

- [ ] Core Web Vitals "Good"
- [ ] Meta tags em todas as páginas
- [ ] Schema markup implementado
- [ ] Sitemap atualizado automaticamente

### Funcionalidades IA

- [ ] Scraping do Vaticano implementado e funcionando
- [ ] Chatbot respondendo adequadamente
- [ ] Sistema de tradução com 90%+ de precisão
- [ ] Base de conhecimento completa e atualizada

## 💰 Custos Estimados das Novas Funcionalidades

### Sistema de Notícias Automatizado

#### **Opção Premium** (Paga)

- **OpenAI API**: $20-50/mês (dependendo do volume)
- **Google Translate API**: $10-30/mês
- **Storage adicional**: $5-10/mês
- **Total estimado**: $35-90/mês

#### **Opção Econômica** (Gratuita/Baixo Custo) ⭐

- **Hugging Face Transformers**: **GRATUITO** (modelos open-source)
- **LibreTranslate ou MyMemory API**: **GRATUITO** (até limites generosos)
- **Cron Jobs/Scheduled Tasks**: **INCLUÍDO** no Render
- **Storage**: **INCLUÍDO** no plano atual
- **Total estimado**: **$0-15/mês**

### Chatbot com IA

#### **Opção Premium**

(Paga)

- **OpenAI GPT API**: $30-100/mês (dependendo do uso)
- **Knowledge Base Storage**: $5-15/mês
- **Analytics/Monitoring**: $10-25/mês
- **Total estimado**: $45-140/mês

#### **Opção Econômica**

(Gratuita/Baixo Custo) ⭐

- **Hugging Face Inference API**: **GRATUITO** (modelos como Llama, Mistral)
- **Local Knowledge Base**: **INCLUÍDO** no banco atual
- **Analytics básico**: **INCLUÍDO** (logs nativos)
- **Groq API**: **GRATUITO** (até 6000 tokens/min)
- **Total estimado**: **$0-10/mês**

### **Resumo de Custos**

- **Opção Premium**: $80-230/mês
- **Opção Econômica**: **$0-25/mês** ⭐ **RECOMENDADA**

## ⚙️ Considerações Técnicas

### Sistema de Scraping

- **Compliance**: Respeitar robots.txt e termos de uso do Vaticano
- **Rate Limiting**: Implementar delays entre requests
- **Error Handling**: Sistema robusto para falhas de rede
- **Data Quality**: Validação e sanitização de conteúdo
- **Backup**: Sistema de fallback para fontes alternativas

### Chatbot IA

- **Privacidade**: LGPD compliance para dados de conversas
- **Moderação**: Filtros para conteúdo inapropriado
- **Escalabilidade**: Suporte a múltiplos usuários simultâneos
- **Fallback**: Sistema para transferir para humano
- **Personalização**: Adaptação ao contexto da igreja

## 🆓 Alternativas Gratuitas Detalhadas

### **Para Tradução (Custo Zero)**

#### **LibreTranslate** ⭐ RECOMENDADO

- **Custo**: Completamente gratuito
- **Limite**: Sem limites para auto-hospedagem
- **Qualidade**: Boa para português ↔ italiano/inglês
- **Instalação**: Docker container no próprio servidor

#### **MyMemory API**

- **Custo**: Gratuito até 10.000 caracteres/dia
- **Qualidade**: Excelente (usa Google Translate + outras fontes)
- **Limite**: Suficiente para notícias mensais

#### **Google Translate (Free Tier)**

- **Custo**: $0 até 500.000 caracteres/mês
- **Qualidade**: Excelente
- **Limite**: Mais que suficiente para uso da igreja

### **Para IA de Sumarização (Custo Zero)**

#### **Hugging Face Transformers** ⭐ RECOMENDADO

- **Custo**: Completamente gratuito
- **Modelos**: mT5, BART, Pegasus em português
- **Hospedagem**: No próprio servidor ou Inference API gratuita
- **Qualidade**: Muito boa para resumos

#### **Groq API** ⭐ NOVO

- **Custo**: Gratuito até 6.000 tokens/minuto
- **Modelos**: Llama 3.1, Mixtral, Gemma
- **Velocidade**: Extremamente rápido
- **Limite**: Generoso para uso da igreja

#### **Ollama (Self-hosted)**

- **Custo**: Gratuito (roda no próprio servidor)
- **Modelos**: Llama 3.1, Mistral, Phi-3
- **Controle**: Total controle e privacidade
- **Requisitos**: Pelo menos 4GB RAM

### **Para Chatbot (Custo Zero)**

#### **Hugging Face Chat Models**

- **DialoGPT**: Específico para conversas
- **BlenderBot**: Desenvolvido pelo Facebook
- **Llama 3.1 8B**: Excelente qualidade

#### **Groq API para Chat** ⭐ RECOMENDADO

- **Modelos**: Llama 3.1 70B, Mixtral 8x7B
- **Velocidade**: Respostas em < 1 segundo
- **Limite**: 6.000 tokens/min gratuito
- **Qualidade**: Próxima ao GPT-4

#### **LocalAI (Self-hosted)**

- **Custo**: Gratuito
- **Compatibilidade**: API compatível com OpenAI
- **Modelos**: Todos os modelos open-source
- **Privacidade**: 100% local

## 🔧 Implementação Recomendada (Custo Zero)

### **Fase 1: Scraping com Tradução Gratuita**

1. **MyMemory API** para tradução (gratuito até 10k chars/dia)
2. **Hugging Face mT5** para sumarização (gratuito)
3. **Cron job mensal** (incluído no Render)

### **Fase 2: Chatbot Gratuito**

1. **Groq API** com Llama 3.1 (6k tokens/min gratuito)
2. **Knowledge base** no PostgreSQL existente
3. **Interface** em React (já implementado)

### **Escalabilidade**

- **Se crescer muito**: Migrar para Ollama self-hosted
- **Para maior qualidade**: Usar tier pago apenas quando necessário
- **Híbrido**: Combinar gratuito + pago conforme demanda

## 🗓 Cronograma Sugerido

### Sprint 1 (Semana 1-2): Fundação

- Testes + CI/CD
- Variáveis de ambiente
- Headers de segurança básicos

### Sprint 2 (Semana 3-4): Monitoramento

- Analytics
- Error monitoring
- Performance tracking

### Sprint 3 (Semana 5-6): SEO e Performance

- SEO optimization
- Code splitting
- Image optimization

### Sprint 4A (Semana 7-8): Melhorias UX

- Accessibility
- Loading states
- Form improvements

### Sprint 4B (4-5 semanas): Sistema de Scraping IA

- **Research & Setup**: APIs do Vaticano e tradução
- **Backend Development**: Scraping engine e schedulers
- **IA Integration**: OpenAI para sumarização
- **Testing & Validation**: Qualidade e compliance
- **Deployment**: Cron jobs e monitoring

### Sprint 5 (4-6 semanas): Chatbot IA

- **Knowledge Base**: Criação da base de dados
- **OpenAI Integration**: GPT API e fine-tuning
- **Frontend Interface**: Chat widget e UX
- **Backend Logic**: Conversation flow e fallbacks
- **Testing & Training**: Scenarios e refinements

### Sprint 6+ (Ongoing): Features Avançadas

- Sistema de comentários
- PWA completo
- Integrações avançadas
- Analytics avançados
- Maintenance e otimizações

---

**Última atualização**: 2025-07-10
**Status**: 📋 Roadmap atualizado com correções UX implementadas
**Próximo Marco**: Performance optimization → Scraping IA → Chatbot IA
