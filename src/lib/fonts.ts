import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Tipografia do projeto.
 *
 * - `Bricolage Grotesque` assina os títulos: grotesca variável, com personalidade
 *   e ótimo contraste em tamanhos grandes. É uma fonte variável (peso 200–800),
 *   então o peso vem do CSS.
 * - `Inter` mantém a leitura dos textos e da interface.
 * - `JetBrains Mono` assina rótulos, preços e códigos de pedido.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/** Classes combinadas aplicadas ao elemento `html`. */
export const fontClassName = `${display.variable} ${body.variable} ${mono.variable}`;
