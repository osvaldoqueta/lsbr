"use client";

import React from "react";
import {
  FOX_BRAND_TOKENS,
  TRUST_BAR_ITEMS,
  CORE_SOLUTIONS,
  FEATURED_PARTNERS
} from "../lib/design-system";

/**
 * Componente Principal da Landing Page FOX LIBRAS — Soluções em Acessibilidade
 * Implementação Fiel da Referência Visual Homologada (public/layout-novo/layout-1.png)
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#061A33] text-[#061A33] antialiased">
      {/* 1. HEADER INSTITUCIONAL */}
      <header className="sticky top-0 z-50 w-full bg-[#061A33] border-b border-white/10 h-[72px] flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3 shrink-0" aria-label="FOX LIBRAS — Soluções em Acessibilidade">
            <img
              src="/assets/brand/logo-horizontal.svg"
              alt="FOX LIBRAS — Soluções em Acessibilidade"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação Principal">
            <a href="#inicio" className="nav-link-fox active text-[13.5px]">Início</a>
            <a href="#solucoes" className="nav-link-fox text-[13.5px]">Soluções</a>
            <a href="#veja-na-pratica" className="nav-link-fox text-[13.5px]">Demonstração</a>
            <a href="#diagnostico-lbi" className="nav-link-fox text-[13.5px]">Diagnóstico LBI</a>
            <a href="#parceiros-ancora" className="nav-link-fox text-[13.5px]">Portfólio</a>
            <a href="#sobre" className="nav-link-fox text-[13.5px]">Sobre</a>
            <a href="#contato" className="nav-link-fox text-[13.5px]">Contato</a>
            <a href={FOX_BRAND_TOKENS.identity.whatsappUrl} className="btn-fox-orange text-[13.5px] px-5 py-2.5">
              <span>Solicitar proposta</span>
            </a>
          </nav>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section id="inicio" className="relative w-full bg-[#061A33] overflow-hidden">
        <div className="w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[430px]">
          <div className="lg:col-span-6 px-6 lg:pl-8 lg:pr-4 py-12 flex flex-col justify-center">
            <div className="eyebrow-badge text-[#08B9F2] mb-4">
              ACESSIBILIDADE QUE CONECTA PESSOAS
            </div>
            <h1 className="font-display text-white font-extrabold text-[34px] lg:text-[46px] leading-[1.1] tracking-[-0.025em] mb-5">
              Comunicação acessível.<br />
              <span className="text-[#08B9F2]">Presença em</span><br />
              todos os espaços.
            </h1>
            <p className="text-white/80 text-[16px] leading-[1.55] max-w-[490px] mb-7">
              Soluções profissionais em Libras, interpretação, atendimento acessível e consultoria especializada.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <a href={FOX_BRAND_TOKENS.identity.whatsappUrl} className="btn-fox-orange px-6 py-3 text-[14px]">
                Solicitar uma proposta
              </a>
              <a href="#solucoes" className="btn-fox-outline px-6 py-3 text-[14px]">
                Conhecer soluções
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-[430px] overflow-hidden">
            <img
              src="/assets/images/layout/hero-interpreter.png"
              alt="Intérprete profissional da FOX LIBRAS atuando ao vivo"
              className="w-full h-full object-cover object-right"
            />
          </div>
        </div>
      </section>

      {/* 3. FAIXA DE CREDIBILIDADE */}
      <section className="w-full bg-[#F4F6FA] border-b border-[#DCE3EC]">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:h-[82px] grid grid-cols-2 lg:grid-cols-4 items-center">
          {TRUST_BAR_ITEMS.map((item) => (
            <div key={item.id} className="trust-item flex items-center justify-center gap-3.5 px-4 py-2">
              <span className="text-[#061A33] font-semibold text-[13.5px] leading-[1.25]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOLUÇÕES & 5. VEJA NA PRÁTICA */}
      <section id="solucoes" className="w-full bg-white py-14">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CORE_SOLUTIONS.map((sol) => (
              <article key={sol.key} className="solution-card-fox p-7">
                <div>
                  <h3 className="font-display text-[#061A33] font-bold text-[20px] mb-2.5">{sol.title}</h3>
                  <p className="text-[#52627A] text-[14px] leading-[1.6] mb-6">{sol.description}</p>
                </div>
                <span className="text-[#08B9F2] font-bold text-[13.5px]">{sol.ctaLabel}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIAGNÓSTICO LBI E PARCEIROS */}
      <section id="diagnostico-lbi" className="w-full bg-[#EEF2F7] border-y border-[#DCE3EC] py-11">
        <div className="w-full max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="eyebrow-badge text-[#061A33] mb-2.5">DIAGNÓSTICO LBI</div>
            <h2 className="font-display text-[#061A33] font-extrabold text-[30px] leading-[1.15]">
              Conformidade <span className="text-[#08B9F2]">e<br />segurança jurídica.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[#52627A] text-[13.5px] leading-[1.55] mb-4">
              Realizamos diagnóstico e consultoria para adequação à Lei Brasileira de Inclusão (LBI), garantindo que sua empresa esteja em conformidade com a legislação.
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-4 gap-3">
            {FEATURED_PARTNERS.map((p) => (
              <div key={p.name} className="h-12 px-2.5 rounded-lg bg-white border border-[#DCE3EC] flex items-center justify-center grayscale">
                <img src={p.logo} alt={p.name} className="max-h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

