# Arquitetura da Nova Página Aula 1 - Mobile First

## 1. PRINCÍPIOS DE DESIGN

### Mobile First Absoluto
- **Viewport**: 375px como base (iPhone SE)
- **Fontes**: Mínimo 16px para corpo, 24px+ para títulos
- **Touch Targets**: Mínimo 44x44px para todos os botões
- **Espaçamento**: Generoso (24px entre seções)
- **Zero Poluição Visual**: Um elemento principal por viewport

### Hierarquia Visual
1. **Hero**: Player de Vídeo (Above the Fold)
2. **Progresso**: Barra de 25% + Badge atual
3. **Conteúdo Linear**: Seções em fluxo guiado
4. **CTA Final**: Card de bloqueio da Aula 2

---

## 2. COMPONENTES PRINCIPAIS

### A. VideoHero Component
```
- Aspect ratio 16:9
- Overlay de bloqueio com data de estreia
- Mensagem clara: "ESTREIA DIA 01/12 às 20h"
- Ícone de calendário/relógio
```

### B. ProgressHeader Component
```
- Barra de progresso fixa no topo (sticky)
- Percentual: 0% → 25% (conforme scroll/conclusão)
- Badge dinâmico: Estudante → Analista Jr → Analista Elite
- Texto: "Progresso da Certificação: X%"
```

### C. LinearSection Component (Reutilizável)
```
Estrutura:
1. Título da seção
2. Conteúdo (texto/áudio/vídeo/card)
3. Botão CTA: "Concluir e Ir para Próxima Etapa"
4. Comportamento: Smooth scroll para próxima seção OU expandir accordion

Estados:
- pending (cinza, não iniciado)
- active (azul, em progresso)
- completed (verde, concluído)
```

### D. AccordionSection Component
```
- Usa Radix UI Accordion
- Apenas uma seção aberta por vez (collapsible)
- Ícone: ChevronDown/ChevronUp
- Animação suave de expansão
- Conteúdo interno: Cards dos 5 perfis
```

### E. TraitCard Component (Perfis)
```
Estrutura:
- Ícone do perfil (Brain, Heart, Trophy, Shield, Star)
- Nome: "O ESQUIZOIDE (Racional)"
- Foco: "Ideias e Lógica"
- Corpo: Descrição física
- Dor: Dor existencial
- Poder: Recurso principal
- Botão: "Estudo Concluído"
```

### F. QuizSection Component
```
- 3 perguntas de múltipla escolha
- Feedback imediato (verde/vermelho)
- Contador de acertos
- Botão final: "Finalizar Missão"
```

### G. CompletionCard Component
```
- Título: "PARABÉNS! 25% CONCLUÍDO"
- Mensagem motivacional
- Ícone de troféu/estrela
- Card de bloqueio da Aula 2:
  - Título: "Aula 2: A Origem Emocional das Doenças"
  - Data: "03/12 às 20h"
  - Ícone de cadeado
  - Botão: "Definir Lembrete da Aula 2"
```

---

## 3. FLUXO DE NAVEGAÇÃO LINEAR

```
1. VideoHero (Above the Fold)
   ↓ [Scroll natural]

2. ProgressHeader (Sticky)
   ↓

3. IntroSection
   "Bem-vindo à sua formação técnica"
   [Botão: "Começar Estudo Preparatório ↓"]
   ↓ [Smooth scroll]

4. MultimediaSection
   - Áudio (12min)
   - Vídeo (síntese)
   [Botão: "Avançar para Base Teórica →"]
   ↓ [Smooth scroll]

5. AccordionSection - Base Teórica
   - Card: "A Biologia do Comportamento"
   - Card: "Conceito Chave: Mielinização"
   [Botão: "Estudar os 5 Perfis da Mente →"]
   ↓ [Expande próximo accordion]

6. AccordionSection - Os 5 Perfis
   - TraitCard × 5 (Esquizoide, Oral, Psicopata, Masoquista, Rígido)
   [Botão: "Ver Alerta de Saúde →"]
   ↓ [Expande próximo accordion]

7. AccordionSection - Psicossomática
   - AlertCard com lista de sintomas
   [Botão: "Ir para Prática de Observação →"]
   ↓ [Smooth scroll]

8. ExerciseSection
   - Textarea para anotações
   [Botão: "Registrar Análise →"]
   ↓ [Smooth scroll]

9. QuizSection
   - 3 perguntas
   [Botão: "Finalizar Missão da Aula 1"]
   ↓ [Smooth scroll]

10. CompletionCard
    - Parabéns 25%
    - Bloqueio Aula 2
    [Botão: "Definir Lembrete"]
```

---

## 4. SISTEMA DE GAMIFICAÇÃO

### Progresso por Seção
```javascript
const SECTIONS = [
  { id: 'intro', points: 50 },
  { id: 'multimedia', points: 100 }, // 50 por item
  { id: 'fundamentos', points: 100 }, // 50 por card
  { id: 'tracos_carater', points: 250 }, // 50 por perfil
  { id: 'alerta_saude', points: 50 },
  { id: 'exercises', points: 50 },
  { id: 'quiz', points: 150 }, // 50 por questão
];

const TOTAL_POINTS = 750;
const PROGRESS_CAP = 25; // Teto de 25% para Aula 1
```

### Badges
```javascript
const BADGES = {
  estudante: {
    label: "Estudante",
    icon: "📚",
    threshold: 150, // 3 seções × 50
    color: "bg-gray-100 text-gray-800"
  },
  analista_jr: {
    label: "Analista Jr.",
    icon: "📝",
    threshold: 300, // 6 seções
    color: "bg-blue-100 text-blue-800"
  },
  analista_elite: {
    label: "Analista de Elite",
    icon: "🎓",
    threshold: 550, // 11 seções (completo)
    color: "bg-green-100 text-green-800"
  }
};
```

### LocalStorage
```javascript
// Salvar progresso do usuário
localStorage.setItem('aula1_progress', JSON.stringify({
  completedSections: ['intro', 'multimedia'],
  points: 150,
  currentBadge: 'estudante',
  quizAnswers: [true, false, true],
  exerciseText: "Minhas anotações..."
}));
```

---

## 5. PALETA DE CORES (Mobile Optimized)

### Tema Claro (Padrão)
```css
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB; /* gray-50 */
--text-primary: #111827; /* gray-900 */
--text-secondary: #6B7280; /* gray-500 */
--accent: #3B82F6; /* blue-500 */
--success: #10B981; /* green-500 */
--warning: #F59E0B; /* amber-500 */
--danger: #EF4444; /* red-500 */
```

### Tema Escuro (Opcional)
```css
--bg-primary: #0A0A0A;
--bg-secondary: #1A1A1A;
--text-primary: #FFFFFF;
--text-secondary: #A3A3A3;
```

---

## 6. COPY PROFISSIONAL

### Palavras-Chave
- ✅ Método, Decodificação, Mielinização, Mapa, Profissão
- ✅ Formação, Certificação, Analista, Técnico
- ❌ Dever de Casa, Escolinha, Brincadeira

### Exemplos de Tom
```
Antes: "Faça seu dever de casa!"
Depois: "Prática de Observação Técnica"

Antes: "Parabéns, você ganhou uma estrelinha!"
Depois: "Missão 1 Cumprida. Progresso: 25%"

Antes: "Assista ao vídeo fofo"
Depois: "Síntese Visual da Aula (Resumo Executivo)"
```

---

## 7. TECNOLOGIAS UTILIZADAS

- **React 19.2** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Radix UI** (accordion, progress, dialog)
- **Lucide React** (ícones)
- **React Router DOM** (navegação)

---

## 8. ESTRUTURA DE ARQUIVOS

```
/pages/
  LessonPlayer.tsx (página principal - já existe)

/components/
  /aula1/
    VideoHero.tsx
    ProgressHeader.tsx
    IntroSection.tsx
    MultimediaSection.tsx
    AccordionSection.tsx
    TraitCard.tsx
    ExerciseSection.tsx
    QuizSection.tsx
    CompletionCard.tsx
    LinearButton.tsx (botão reutilizável)

/data/
  aula1-nova.json (JSON fornecido pelo usuário)

/hooks/
  useAula1Progress.ts (gerenciar progresso e localStorage)

/utils/
  smoothScroll.ts (scroll suave entre seções)
```

---

## 9. PRÓXIMOS PASSOS

1. ✅ Criar JSON final da Aula 1 (baseado no fornecido)
2. ⏳ Desenvolver componentes base (VideoHero, ProgressHeader)
3. ⏳ Implementar navegação linear com smooth scroll
4. ⏳ Criar sistema de progresso e badges
5. ⏳ Implementar quiz e completion card
6. ⏳ Testar responsividade (375px → 1920px)
7. ⏳ Deploy e validação final

---

**Data**: 29/11/2025  
**Versão**: 1.0  
**Status**: Planejamento Concluído
