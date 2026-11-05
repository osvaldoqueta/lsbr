# CONTEXT.md — FOX LIBRAS | Acessibilidade Corporativa B2B

> **Documentação Viva & Consciência Situacional para IA (Np1.md compliance)**
> Subdomínio de Destino: `https://libras.foxstorebr.com`
> Razão Social / Homologação: CNPJ 66.550.293/0001-99 | Fox Store BR / Fox Libras
> Especialista Principal: Prof. Mestre Osvaldo Queta

---

## 📌 Visão Geral do Projeto

O **FOX LIBRAS** é uma plataforma B2B de alta performance e governança em acessibilidade, especializada na intermediação de tradução, interpretação e central de atendimento em Língua Brasileira de Sinais (LIBRAS). O sistema foi concebido para atender empresas privadas, instituições de ensino e órgãos governamentais em conformidade estrita com a **Lei Brasileira de Inclusão (LBI nº 13.146/2015)** e o **Decreto nº 5.626/2005**.

---

## 🚀 Histórico de Sprints

### 📅 Sprint 4.0 — Design System + Implementação Fiel da Referência Visual (`layout-1.png`) & Arquitetura Modular (05/11/2026)
- **Redesign Completo Fiel à Referência Visual Aprovada (`public/layout-novo/layout-1.png`)**:
  - **Tokens do Design System**: Paleta oficial implementada em [`assets/css/style.css`](file:///c:/Users/Queta/.libras/assets/css/style.css), [`tailwind.config.js`](file:///c:/Users/Queta/.libras/tailwind.config.js) e [`src/lib/design-system.ts`](file:///c:/Users/Queta/.libras/src/lib/design-system.ts) (`#061A33` Azul-marinho principal, `#0B2140` Azul-marinho secundário, `#102B4D` Superfícies, `#08B9F2` Ciano principal, `#35C7F5` Ciano secundário, `#FF7800` Laranja institucional, `#F4F6FA` Fundo claro, `#52627A` Cinza textual, `#DCE3EC` Bordas claras).
  - **7 Seções Principais Reproduzidas com Fidelidade Pixel-a-Pixel**:
    1. **Header Institucional (`#navbar`)**: Sticky `72px` em `#061A33`, logotipo oficial `assets/brand/logo-horizontal.svg`, links (`Início` com indicador ativo laranja, `Soluções` com dropdown interativo, `Demonstração`, `Diagnóstico LBI`, `Portfólio`, `Sobre`, `Contato`) e botão arredondado laranja `Solicitar proposta`.
    2. **Hero Principal (`#inicio`)**: Composição horizontal dividida (`48%` texto à esquerda + `52%` fotografia editorial `assets/images/layout/hero-interpreter.png` à direita com fusão suave e indicador interativo `"Interpretação profissional • Ao vivo"`), selo `"ACESSIBILIDADE QUE CONECTA PESSOAS"`, headline em 3 linhas `"Comunicação acessível. / Presença em / todos os espaços."` e CTAs primário e secundário.
    3. **Faixa de Credibilidade**: Fundo claro `#F4F6FA`, 4 pilares com divisores verticais e ícones SVG em azul/ciano (`Atuação profissional`, `Liderança técnica especializada`, `Conformidade LBI`, `Atendimento nacional`).
    4. **Seção de Soluções (`#solucoes`)**: Fundo claro, título `"Soluções para uma comunicação sem barreiras."` e 3 cards equivalentes (`Central de Libras & SAC`, `Interpretação de eventos`, `Tradução e legendagem`) com modais de detalhamento (`Saiba mais →`).
    5. **Banner de Demonstração (`#veja-na-pratica`)**: Card horizontal arredondado com fotografia de palco (`assets/images/layout/demo-stage.png`), gradiente azul-marinho, título `"Veja a acessibilidade em ação."` e botão play circular central conectado ao Showcase de Vídeos Reais.
    6. **Diagnóstico LBI e Parceiros (`#diagnostico-lbi`)**: Faixa horizontal em 3 colunas com divisores verticais (`Conformidade e segurança jurídica.`, explicação + botão laranja `"Solicitar diagnóstico →"`, e faixa `"NOSSOS PARCEIROS"` com logotipos monocromáticos oficiais `JFTV Câmara`, `Orbenk`, `BD`, `Câmara Municipal de Juiz de Fora`).
    7. **Sobre a FOX LIBRAS (`#sobre`)**: Seção azul-marinho em 3 colunas assimétricas com fotografia institucional (`assets/images/layout/about-interpreter.png`), título `"Mais que tecnologia, um compromisso social."` e botão `"Conheça nossa história →"`.
    8. **Footer Institucional**: Azul-marinho profundo (`#041225`) em 5 colunas com dados reais da FOX LIBRAS (`(63) 99258-1001`, `osvaldoqueta@gmail.com`, `Juiz de Fora / MG`), redes sociais, links legais e detalhe curvo laranja/azul no canto inferior direito.
- **Preservação de 100% das Funcionalidades Existentes (`#complementaryHubWrapper` + Modais)**:
  - Mantidos integralmente o Marquee e Portfólio de Corporações Atendidas (`#corporacoes-atendidas`), Vitrine de Vídeos Reais (`#demonstracao`), Scanner Interativo de Conformidade LBI em 3 Abas (`#comparativo-autoridade`), Trajetória do Prof. Mestre Osvaldo Queta + PDF Lattes (`#quem-somos`), Carrossel de 26 Fotos de Bastidores (`#bastidores`), Simulador de Investimento B2B (`#calculadora`), Formulário de Contato (`#contato`), Painel Admin Supabase (`#adminModal`), Meta Pixel (`624428955224744`) e Widget VLibras.

---

### 📅 Sprint 2.2 — Auto-Descoberta Dinâmica de Mídias (Manifests) & Responsividade de Imagens (23/09/2026)
- **Auto-Descoberta de Imagens via `manifest.json`**:
  - Criados os arquivos de manifesto [`assets/images/corps/manifest.json`](file:///c:/Users/Queta/.libras/assets/images/corps/manifest.json) e [`assets/images/gallery/manifest.json`](file:///c:/Users/Queta/.libras/assets/images/gallery/manifest.json) para auto-detecção em tempo de execução sem alterar código-fonte no HTML.
  - Implementada a função assíncrona `fetchDirectoryManifest()` que consome dinamicamente novos logotipos (incluindo `hqdefault.jpg`, `logo-camara-jf.png` e novos envios) e fotos de bastidores.
  - Adicionada formatação automática do nome de exibição das marcas a partir dos nomes de arquivos.
- **Dimensionamento Responsivo & Tratamento de Erros**:
  - Aplicação de `max-h-full max-w-full object-contain` nos cards de logos brancas (`h-14 md:h-16 w-36 sm:w-44`) e `object-cover` nas galerias.
  - Atributo `onerror="this.closest(...).remove()"` integrado para omissão silenciosa de imagens inexistentes ou corrompidas, preservando o layout limpo.

---

### 📅 Sprint 2.1 — Meta (Facebook) Pixel ID 624428955224744 & Correções de Animação/Favicon (23/09/2026)
- **Integração do Meta (Facebook) Pixel**:
  - Código oficial do Meta Pixel (ID `624428955224744`) inserido no `<head>` de `index.html` com suporte `<noscript>` fallback.
  - Telemetria de conversão `fbq('track', 'Lead')` vinculada aos formulários de proposta e disparos para o WhatsApp.
- **Correção da Animação do Carrossel Marquee (#corporacoes-atendidas)**:
  - Adicionados os keyframes CSS `@keyframes marquee` (`0%` a `-50%`) e a classe `.animate-marquee` no `<style>` do projeto.
  - Ativada a aceleração de hardware GPU (`will-change: transform`) para deslizamento contínuo sem pausas em navegadores mobile (Android/iOS touch).
- **Atualização do Favicon Oficial**:
  - Tag `<link rel="icon">` atualizada no `<head>` com apontamento direto para `assets/images/logo/favicon-1.png`.

---
- **Integração dos Vídeos do YouTube Shorts (`@quetaenglish`)**:
  - Substituição dos arquivos locais de teste na seção *Demonstração Prática & Autoridade* (`#galeria-servicos`) pelos vídeos reais do canal oficial `@quetaenglish`.
  - Mapeamento dinâmico de 6 YouTube Shorts (`ofSwbP4dN34`, `Q2M-EY789xQ`, `BdA5100ZBQg`, `ceWu2eh4lD4`, `6aztjSFdRII`, `-oyKvGXqOLk`) através da API de iframe `https://www.youtube-nocookie.com/embed/`.
  - Atualização do renderizador `renderServicesVideoGrid()` com distruição uniforme em grid responsiva de 3 colunas, badge exclusivo com ícone do YouTube (`YouTube Shorts`) e descrições técnicas detalhadas para cada modalidade de atendimento.

---

### 📅 Sprint 1.9 — Identidade Visual Oficial, Carrosséis B2B, Telemetria Supabase & Dashboard Admin (23/09/2026)
- **Atualização da Identidade Visual**:
  - Logomarca oficial do Header e Footer atualizada para `assets/images/logo/logo-1-transp.png` com ajuste proporcional responsivo (`h-10 sm:h-12 w-auto object-contain`), eliminando distorção visual em telas mobile e desktop.
  - Favicon atualizado no `<head>` para a marca oficial `assets/images/logo/favicon-1.png`.
- **Carrossel Dinâmico de Corporações Atendidas (Prova Social B2B)**:
  - Nova seção `#corporacoes-atendidas` posicionada logo abaixo da Hero Section (*"Organizações e Instituições Atendidas"*).
  - Implementação de slider de velocidade constante em malha infinita (infinite marquee CSS `@keyframes marquee`) consumindo os logotipos em `assets/images/corps/` (`UniAcademia.png`, `cocacola.png`, `estacao-das-artes.png`, `imepp.png`, `logo-bd-jf.png`, `logo_site-camara.png`, `tv-camara.jpg`).
  - Padronização visual em escala de cinza com transição para cores reais no hover (`grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`).
- **Carrossel Interativo de Bastidores (`assets/images/gallery/`)**:
  - Reformulação da aba de bastidores da seção `#bastidores` (Portfólio Prático) em um carrossel responsivo interativo alimentado por array JS dinâmico com 20 registros fotográficos de atuação técnica.
  - Navegação por botões Anterior/Próximo, contador de fotos em tempo real e suporte completo a gestos de touch/swipe drag em dispositivos móveis, mantendo a ampliação em Lightbox High-Res.
- **Otimização da Arquitetura de Vídeos & Streaming**:
  - Estrutura modular em JavaScript (`DEMO_VIDEOS` + `renderServicesVideoGrid()`) com suporte híbrido para players embutidos do YouTube (`<iframe>` com `loading="lazy"`) e mídias locais de `assets/videos/` (`<video>` com `preload="metadata"` e `poster="assets/images/video-poster.jpg"`).
- **Telemetria por IP/Região & Dashboard Administrativo B2B (Supabase)**:
  - Integração do SDK `@supabase/supabase-js` v2 via CDN conectando à URL `https://vqzzmbhbzhhrqodvikhn.supabase.co`.
  - **Coleta Silenciosa Frontend**: Captura automática no carregamento da página com geolocalização por IP (`ipapi.co` / `freeipapi.com`) e inserção na tabela `site_visits` do Supabase com os campos:
    - `ip_address` (IP do visitante / hash)
    - `city` (Cidade)
    - `region` (Estado / UF)
    - `country` (País)
    - `visited_at` (Timestamp ISO)
    - `device_type` (Mobile ou Desktop)
  - **Painel Administrativo (#admin)**:
    - Rota hash `#admin` e modal autenticado acessível por botão discreto no rodapé.
    - Autenticação por senha mestre administrativa ou Supabase Auth.
    - Exibição de métricas acumuladas: total de visitas, total de regiões (UF) ativas, percentual mobile, gráfico de barras com distribuição por estado (MG, SP, SC, MA, PA, etc.) e tabela dos últimos acessos em tempo real com indicador de localização.
  - **Resiliência de Dados**: Armazenamento secundário em cache local (`localStorage`) para exibição ininterrupta das métricas de telemetria em cenários offline ou em fase de provisionamento de chaves.

---

### 📅 Sprint 1.8 — Preenchimento Full-Width & Elementos Flutuantes Sem Colisão (22/07/2026)
- **Ajuste de Imagens de Fundo Full-Width**:
  - Aplicação de `relative w-full bg-cover bg-center bg-no-repeat overflow-hidden` nas seções com imagens decorativas e marcas d'água (`#inicio`, `#servicos`, `#calculadora`).
  - Posicionamento refinado do ativo `assets/images/libras-maos.png` com `absolute right-0 bottom-0 pointer-events-none opacity-[0.05] max-w-[320px] overflow-hidden`, eliminando extrapolações e cortes indevidos nos cards de serviço.
- **Hierarquia Visual Sem Colisão dos Elementos Flutuantes**:
  - **WhatsApp CTA Button**: Fixado em `fixed bottom-6 right-6 z-50` com círculo verde radiante e indicador de presença.
  - **Botão Voltar ao Topo (Scroll To Top)**: Posicionado em `fixed bottom-24 right-6 z-40` (exatamente acima do WhatsApp), exibido dinamicamente via JS ao rolar > 300px.
  - **Widget VLibras**: Posicionamento forçado na lateral direita em `top: 45% !important`, `right: 0px !important`, `z-index: 30 !important`, afastando o avatar de acessibilidade de qualquer botão de ação ou cartão de conteúdo.

---

### 📅 Sprint 1.7 — Reestruturação do Header / Navbar Single-Line (22/07/2026)
- Navegação enxuta com termos de palavra única (`whitespace-nowrap`), botão CTA pílula moderna (`from-sky-500 to-blue-600`) e banner superior LBI compacto.

---

### 📅 Sprint 1.6 — Widget Oficial VLibras, Imagem Hero & Marca D'água (22/07/2026)
- Widget oficial do VLibras (`vlibras-plugin.js`), fundo real da Hero Section com overlay WCAG AAA e marca d'água `libras-maos.png`.

---

### 📅 Sprint 1.5 — Redesign Visual "Navy Enterprise" (22/07/2026)
- Reformulação do Design System B2B para Azul Marinho Profundo (`#080E1E`), Grafite Corporativo (`#0F172A`) e Cinza Slate (`#1E293B`) com respiro amplo (`py-24`).

---

### 📅 Sprint 1.4 — Galeria de Vídeos Práticos & Autoridade (22/07/2026)
- Seção *Demonstração Prática & Autoridade* (`#galeria-servicos`) com cards de vídeo HTML5 reais.

---

### 📅 Sprint 1.3 — Ajuste de Hierarquia Tipográfica na Calculadora (22/07/2026)
- Container `#calcPrice` com "a partir de" discreto (`text-sm text-slate-400`) e número destacado (`text-3xl sm:text-4xl text-sky-400 font-mono`).

---

### 📅 Sprint 1.2 — Posicionamento Corporativo, Captura de Lead & Galeria de Bastidores (22/07/2026)
- Redesign do Header (`#0B132B`), foto de perfil com `object-top`, remoção de menção a MEI, modal de captura de lead para WhatsApp e modal LGPD.

---

### 📅 Sprint 1.1 — Atualização de Mídias Reais & Precificação Parametrizada (22/07/2026)
- Mídias reais em `assets/` e declaração do objeto global `PRICING_CONFIG`.

---

### 📅 Sprint 1.0 — Lançamento da Landing Page SPA B2B (22/07/2026)
- Construção da SPA autônoma (`index.html`) em conformidade com o Np1.md.

---

## 🛠️ Estrutura Atualizada de Arquivos do Projeto

```
.libras/
├── index.html                                 # SPA Completa (Hero Full-Width, Marquee B2B, Carrossel Bastidores, Streaming Vídeos, Telemetria IP, Supabase & Dashboard Admin)
├── CONTEXT.md                                 # Documentação viva do projeto e histórico das Sprints 1.0 a 1.9
├── Np1.md                                     # Diretrizes globais de governança, arquitetura e Np1 compliance
└── assets/
    ├── images/
    │   ├── logo/
    │   │   ├── logo-1-transp.png              # Logo oficial transparente FOX LIBRAS (Header & Footer)
    │   │   └── favicon-1.png                  # Favicon oficial PNG da plataforma
    │   ├── corps/                             # Marcas e logotipos das corporações e instituições atendidas
    │   │   ├── UniAcademia.png
    │   │   ├── cocacola.png
    │   │   ├── estacao-das-artes.png
    │   │   ├── imepp.png
    │   │   ├── logo-bd-jf.png
    │   │   ├── logo_site-camara.png
    │   │   └── tv-camara.jpg
    │   ├── gallery/                           # Galeria fotográfica de bastidores e atuação prática
    │   ├── osvaldo-queta-perfil.jpg           # Fotografia de perfil do Prof. Osvaldo Queta
    │   ├── video-poster.jpg                   # Poster dos vídeos de demonstração
    │   ├── libras_pessoas_se_comunicam.jpg   # Imagem de fundo da Hero Section (Acessibilidade Real)
    │   └── libras-maos.png                    # Ilustração gráfica / marca d'água das mãos em Libras
    ├── pdf/
    │   └── Curriculo-Osvaldo-Queta-LIBRAS.pdf # Currículo profissional e acadêmico em PDF
    └── videos/                                # Acervo de mídias e demonstrações práticas em Libras
```

---

## 🗄️ Esquema da Tabela Supabase (`site_visits`)

```sql
CREATE TABLE IF NOT EXISTS site_visits (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    ip_address TEXT DEFAULT 'Anônimo',
    city TEXT,
    region TEXT,
    country TEXT DEFAULT 'Brasil',
    visited_at TIMESTAMPTZ DEFAULT NOW(),
    device_type TEXT
);

-- Política RLS para permitir inserção anônima de telemetria
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir insercao publica de visitas" ON site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura para painel admin" ON site_visits FOR SELECT USING (true);
```
