import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Tipografia do projeto.
 *
 * - `Fraunces` (serifa variável) dá o tom editorial aos títulos. É uma fonte
 *   variável, então não fixamos `weight` nem `style`: os eixos SOFT/WONK fazem
 *   parte do desenho e o peso vem do CSS.
 * - `Inter` mantém a leitura dos textos e da interface.
 * - `JetBrains Mono` assina rótulos, preços e códigos de pedido.
 */
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
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
