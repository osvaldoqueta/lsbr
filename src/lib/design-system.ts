/**
 * FOX LIBRAS — Soluções em Acessibilidade
 * Design System Tokens & Institutional Data (Sprint 4.0 / Np1 Protocol)
 * Reference Layout: public/layout-novo/layout-1.png
 */

export const FOX_BRAND_TOKENS = {
  identity: {
    name: "FOX LIBRAS",
    slogan: "Soluções em Acessibilidade",
    website: "https://libras.foxstorebr.com/",
    cnpj: "66.550.293/0001-99",
    phonePrimary: "(63) 99258-1001",
    phoneSecondary: "(61) 99242-8803",
    whatsappUrl: "https://wa.me/5563992581001",
    email: "osvaldoqueta@gmail.com",
    location: "Juiz de Fora / MG",
    technicalDirector: "Prof. Mestre Osvaldo Queta"
  },
  colors: {
    navyPrimary: "#061A33",
    navySecondary: "#0B2140",
    navySurface: "#102B4D",
    navyDeep: "#041225",
    cyanPrimary: "#08B9F2",
    cyanSecondary: "#35C7F5",
    orangeBrand: "#FF7800",
    white: "#FFFFFF",
    bgLight: "#F4F6FA",
    textMuted: "#52627A",
    borderLight: "#DCE3EC"
  },
  typography: {
    display: "Plus Jakarta Sans, Inter, sans-serif",
    sans: "Inter, system-ui, sans-serif",
    weights: {
      heroHeadline: 800,
      sectionTitle: 800,
      subtitle: 600,
      body: 400,
      navigation: 500
    }
  }
} as const;

export const TRUST_BAR_ITEMS = [
  {
    id: "atuacao",
    label: "Atuação profissional",
    icon: "handshake"
  },
  {
    id: "lideranca",
    label: "Liderança técnica especializada",
    icon: "medal"
  },
  {
    id: "lbi",
    label: "Conformidade LBI",
    icon: "shield-check"
  },
  {
    id: "nacional",
    label: "Atendimento nacional",
    icon: "brazil-map"
  }
] as const;

export const CORE_SOLUTIONS = [
  {
    key: "sac",
    title: "Central de Libras & SAC",
    description: "Atendimento humanizado por intérpretes de Libras, com qualidade e agilidade.",
    ctaLabel: "Saiba mais →"
  },
  {
    key: "eventos",
    title: "Interpretação de eventos",
    description: "Intérpretes especializados para eventos corporativos, institucionais e acadêmicos.",
    ctaLabel: "Saiba mais →"
  },
  {
    key: "traducao",
    title: "Tradução e legendagem",
    description: "Adaptação de conteúdos em Libras e legendagem acessível para vídeos, apresentações e treinamentos.",
    ctaLabel: "Saiba mais →"
  }
] as const;

export const FEATURED_PARTNERS = [
  {
    name: "JFTV Câmara",
    logo: "/assets/images/corps/tv-camara.jpg"
  },
  {
    name: "Orbenk",
    logo: "/assets/images/corps/1_colorido-1-1.webp"
  },
  {
    name: "BD",
    logo: "/assets/images/corps/logo-bd-jf.png"
  },
  {
    name: "Câmara Municipal de Juiz de Fora",
    logo: "/assets/images/corps/logo-camara-jf.png"
  }
] as const;

