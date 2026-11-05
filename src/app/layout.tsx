import React from "react";
import "../../assets/css/style.css";

export const metadata = {
  title: "FOX LIBRAS — Soluções em Acessibilidade | Tradução, Interpretação e Consultoria LBI",
  description:
    "Soluções profissionais em Libras, interpretação, atendimento acessível e consultoria especializada em conformidade com a LBI.",
  metadataBase: new URL("https://libras.foxstorebr.com")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-[#061A33] text-[#061A33] antialiased selection:bg-[#08B9F2] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

