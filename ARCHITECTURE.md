# ARCHITECTURE.md — FOX LIBRAS Architecture & System Design

> **Documentação de Arquitetura, Governança & Conformidade Np1**
> **Versão:** 4.0 (Design System + Implementação Fiel da Referência Visual `layout-1.png` + Arquitetura Modular Next.js/Tailwind)
> **Subdomínio de Produção:** `https://libras.foxstorebr.com/`
> **Razão Social / Homologação:** Fox Store BR / Fox Libras — CNPJ: 66.550.293/0001-99
> **Liderança Técnica & Educacional:** Prof. Mestre Osvaldo Queta (Mestre em Educação, Especialista em Libras & Desenvolvedor de Sistemas)

---

## 1. Visão Geral e Missão

A **FOX LIBRAS** é uma plataforma corporativa B2B de governança e prestação de serviços especializados em acessibilidade comunicacional e Língua Brasileira de Sinais (LIBRAS). O sistema atende empresas privadas, concessionárias de serviços públicos, hospitais, clínicas, instituições de ensino básico/superior e órgãos governamentais com conformidade estrita com:
- **Lei Brasileira de Inclusão (LBI nº 13.146/2015)**
- **Decreto Federal nº 5.626/2005** (Regulamentação da Libras)
- **Lei Geral de Proteção de Dados (LGPD nº 13.709/2018)**
- **WCAG 2.2 Nível AA** (Diretrizes Internacionais de Acessibilidade Web)

---

## 2. Princípios de Engenharia Np1 (Namesis Protocol)

O projeto adota integralmente as diretrizes do **Np1.md**:
1. **Desacoplamento:** Separação estrita entre dados estruturados (mídias, precificação, manifestos), apresentação visual (CSS / Design System) e interatividade (JavaScript modular).
2. **Performance (Core Web Vitals 100/100):**
   - **LCP:** Recursos críticos da primeira dobra com `fetchpriority="high"`, `loading="eager"`, e dimensões explícitas.
   - **CLS:** Contêineres de altura fixa e proporções de aspecto (`aspect-video`, `min-h`) para evitar layout shifts.
   - **INP:** Handlers leves, execução assíncrona, lazy loading de players externos (YouTube Facade).
3. **Segurança & Higienização:**
   - Prevenção ativa de Cross-Site Scripting (XSS) com rotina canônica `sanitizeHTML()`.
   - Proteção contra envio de dados sensíveis ou vazamento de credenciais privadas.
   - Honeypot anti-spam em formulários e proteção contra envios múltiplos.
4. **Responsividade & Mobile-First:**
   - Adaptação fluida para resoluções mobile (320px–480px), tablet (768px–1024px) e desktop ultra-wide (1280px+).
   - Suporte nativo a gestos de touch/swipe em carrosséis.
5. **Acessibilidade Digital como Requisito de Engenharia:**
   - Link de salto ("Pular para o conteúdo").
   - Foco visual nítido em todos os elementos navegáveis por teclado (`:focus-visible`).
   - Rótulos semânticos, `aria-*` intencionais e respeito irrestrito a `prefers-reduced-motion`.
6. **Resiliência e Self-Healing:**
   - Fallbacks dinâmicos locais caso APIs de terceiros (Supabase, CDN, IP Geo) estejam indisponíveis.
   - Omissão silenciosa de imagens inexistentes via handlers `onerror`.

---

## 3. Topologia e Estrutura de Diretórios

```
.libras/
├── index.html                                 # Landing Page SPA B2B Completa
├── brand-guide.html                           # Painel Editorial de Apresentação dos 3 Conceitos de Marca
├── ARCHITECTURE.md                            # Documentação Técnica e Arquitetural Oficial
├── CONTEXT.md                                 # Histórico Vivo de Sprints e Evolução
├── Np1.md                                     # Padrões Globais de Engenharia e Governança
├── sitemap.xml                                # Sitemap para Indexação e Descoberta Orgânica
├── robots.txt                                 # Diretrizes para Rastreadores e Motores de Busca
├── assets/
│   ├── brand/                                 # Ativos Oficiais da Nova Identidade Visual
│   │   ├── logo-horizontal.svg                # Logo Horizontal Vetorial (SVG)
│   │   ├── logo-vertical.svg                  # Logo Vertical Vetorial (SVG)
│   │   ├── logo-symbol.svg                    # Símbolo Isolado Vetorial (SVG)
│   │   ├── logo-monochrome.svg                # Versão Monocromática (SVG)
│   │   ├── favicon.svg                        # Favicon Vetorial Primário (SVG)
│   │   ├── app-icon.svg                       # Ícone de Aplicativo / PWA
│   │   ├── concepts/                          # Os 3 Conceitos Completos Vetoriais
│   │   │   ├── concept-a-fox-signature.svg    # Conceito A: Fox Signature
│   │   │   ├── concept-b-fox-connect.svg      # Conceito B: Fox Connect
│   │   │   └── concept-c-fox-inclui.svg       # Conceito C: Fox Inclui
│   │   └── png/                               # Exportações PNG Transparentes em Alta Resolução
│   ├── css/
│   │   └── style.css                          # Design System Tokens, Acessibilidade e Keyframes
│   ├── js/
│   │   └── script.js                          # Lógica Comercial, Calculadora, Telemetria & Modais
│   ├── images/
│   │   ├── logo/                              # Legado e Ativos Históricos da Marca
│   │   ├── corps/                             # Logotipos de Clientes e Instituições Homologadas
│   │   │   └── manifest.json                  # Manifesto Dinâmico de Parceiros
│   │   └── gallery/                           # Portfólio de Atuação Prática e Bastidores
│   │       └── manifest.json                  # Manifesto Dinâmico de Bastidores
│   ├── pdf/                                   # Currículos e Documentos Oficiais
│   └── videos/                                # Acervo de Mídias de Demonstração
├── marketing/
│   ├── guia-de-marca.md                       # Diretrizes da Marca, Cores, Slogan e Tipografia
│   ├── calendario-editorial-30-dias.md        # Calendário Editorial 30 Dias (Feed + Stories + TikTok)
│   ├── legendas-e-roteiros.md                 # Roteiros Completos para Reels/TikTok (15s a 45s)
│   └── diretrizes-de-imagem.md                # Diretrizes de Criação Visual e Fotografia Acessível
└── public/
    └── marketing/
        ├── posts/                             # As 3 Campanhas de Lançamento (Square, Portrait, Story)
        │   ├── post-01-posicionamento/
        │   ├── post-02-atendimento/
        │   └── post-03-eventos/
        └── templates/                         # Biblioteca com 12 Modelos de Post + 5 Carrosséis
```

---

## 4. Stack Tecnológico e Dependências

| Camada | Tecnologia | Justificativa Técnica |
|---|---|---|
| **Estrutura** | HTML5 Semântico | Garantia de acessibilidade para leitores de tela e indexação SEO. |
| **Estilos & Layout** | Tailwind CSS + CSS Custom Tokens | Flexibilidade utilitária combinada a tokens semânticos e CSS nativo. |
| **Tipografia** | Plus Jakarta Sans (Google Fonts) | Tipografia contemporânea de alta legibilidade corporativa e rendering nítido. |
| **Ícones** | FontAwesome 6.5.1 + SVGs | Ícones universais e acessíveis com `aria-hidden` ou `aria-label`. |
| **Lógica do Cliente** | Vanilla JavaScript (ES6+) | Zero dependência pesada, inicialização em <50ms, sem overhead de runtime. |
| **Widget de Acessibilidade** | VLibras Oficial (Gov.br) | Suporte institucional para avatar de sinais oficial do Governo Federal. |
| **Telemetria & Analytics** | Supabase JS v2 + Cache Local | Registro distribuído de acessos por IP/região com resiliência a offline. |
| **Pixels & Conversão** | Meta Pixel (ID 624428955224744) | Telemetria de conversão `fbq('track', 'Lead')` para tráfego B2B. |

---

## 5. Estratégia de Identidade Visual (Os 3 Conceitos)

1. **Conceito A — FOX SIGNATURE (Direção Principal Adotada):**
   - **Símbolo:** Fusão elegante e memorável entre a silhueta estilizada da raposa (inteligência, sagacidade e visão) e o sinal manual de comunicação em Libras.
   - **Posicionamento:** Humano, sofisticado, acolhedor e com padrão de estúdio de branding profissional.
2. **Conceito B — FOX CONNECT:**
   - **Símbolo:** Construção geométrica baseada em nós de rede, ondas de conexão bidirecional e monograma FL integrado.
   - **Posicionamento:** Soluções tecnológicas SaaS, corporativo minimalista e formal.
3. **Conceito C — FOX INCLUI:**
   - **Símbolo:** Intersecção de duas mãos estilizadas em diálogo acolhedor, simbolizando pertencimento e impacto social.
   - **Posicionamento:** Direcionado a instituições públicas, saúde e ESG.

### Paleta de Cores Homologada (Tokens Np1 v4.0 — Referência `layout-1.png`)
- **Azul-marinho Principal:** `#061A33` (Header, Hero, Sobre, Footer)
- **Azul-marinho Secundário:** `#0B2140` (Superfícies elevadas, modais e barra interativa)
- **Azul de Superfícies:** `#102B4D` (Bordas e cartões internos escuros)
- **Ciano Principal:** `#08B9F2` (Destaques tipográficos, selos, ícones de linha e foco acessível)
- **Ciano Secundário:** `#35C7F5` (Estados de hover e gradientes técnicos)
- **Laranja Institucional:** `#FF7800` (CTAs primários, indicador de página ativa e detalhes geométricos)
- **Branco:** `#FFFFFF` (Seção de Soluções e tipografia sobre fundo escuro)
- **Fundo Claro:** `#F4F6FA` / `#EEF2F7` (Faixa de Credibilidade, Cards de Serviços e Diagnóstico LBI)
- **Cinza Textual:** `#52627A` (Descrições e textos de apoio sobre fundo claro)
- **Bordas Claras:** `#DCE3EC` (Divisores verticais e contornos sutis)

### Slogan Oficial
> **Soluções em Acessibilidade**

---

## 6. Fluxos Críticos de Negócio (CRO & Conversão)

1. **Solicitação Direta via WhatsApp (Hero & Floating CTA):**
   - O visitante clica em qualquer CTA comercial.
   - O sistema valida se já existem dados de contato; caso contrário, abre o modal de identificação corporativa.
   - Disparo do evento Meta Pixel `Lead`.
   - Redirecionamento formatado com mensagem preenchida contendo serviço solicitado, carga horária e dados da empresa.
2. **Simulador de Investimento em Acessibilidade:**
   - Seleção de serviço (Retentor Mensal, SAC Web, Eventos, Legendagem, Consultoria RH, Educacional).
   - Ajuste de volume interativo ou clique em atalhos de franquia (10h, 20h, 40h).
   - Seleção do nível de SLA (Padrão 1.0x, Enterprise 1.35x, Exclusivo 1.60x).
   - Atualização em tempo real do valor estimado e geração de proposta com 1 clique.
3. **Formulário B2B com Validação & Honeypot:**
   - Captura completa de dados corporativos (Nome, E-mail corporativo, Telefone/WhatsApp, Empresa, Interesse, Mensagem).
   - Validação de formato e higienização estrita contra injeção de scripts.
   - Confirmação visual na UI e encaminhamento automatizado ao WhatsApp corporativo do especialista.

---

## 7. Acessibilidade Digital (WCAG 2.2 AA)

- **Contraste de Cores:** Todos os textos sobre fundo escuro (`#071B36` e `#080E1E`) possuem taxa de contraste superior a 4.5:1 (texto normal) e 7:1 (texto grande).
- **Navegação por Teclado:** Ordem lógica de tabulação (`tabindex`), anéis visíveis em `:focus-visible`, e atalho para pular navegação.
- **Leitores de Tela:** Estrutura semântica correta (`header`, `nav`, `main`, `section`, `article`, `footer`), `aria-expanded` no menu mobile, `aria-label` descritivos em botões com ícones.
- **Controle de Mídia:** Vídeos não iniciam com áudio sem interação explícita do usuário. Transmissão e vídeos possuem legendas e controles acessíveis.
- **Movimento Reduzido:** Transições e animações de marquee respeitam a diretiva CSS `@media (prefers-reduced-motion: reduce)`.

---

## 8. Segurança e Governança

- **Proteção XSS:** Todas as entradas de usuário e nomes carregados de manifestos passam por `sanitizeHTML()`.
- **Prevenção de Abuso:** Proteção contra múltiplos cliques em botões de formulário com estados de carregamento (`disabled`).
- **LGPD:** Modal detalhado com identificação do Controlador (Fox Store BR / Fox Libras), bases legais aplicáveis (art. 7º, V da LGPD) e canal de comunicação direto com o Encarregado de Dados (DPO).
- **Sem Exposição de Segredos:** Variáveis privadas não são compiladas ou enviadas ao cliente; a chave do Supabase utilizada é restrita por Row Level Security (RLS) exclusivamente para inserção anônima de métricas agregadas.
