import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import { CartProvider } from "@/components/providers/cart-provider";
import { AccountProvider } from "@/components/providers/account-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { fontClassName } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mercadinho da Praça",
  description:
    "Mercado de bairro com frutas, pães, laticínios e mercearia de produtores locais, com entrega no mesmo dia.",
  applicationName: "Mercadinho da Praça",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mercadinho da Praça",
    title: "Mercadinho da Praça",
    description:
      "Compre do produtor da região, receba no mesmo dia. Frutas, pães, laticínios e mercearia.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

/** Marca o documento como "JS ligado" antes da hidratação. */
const enableJsScript = `document.documentElement.classList.remove("no-js");`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" className={`no-js ${fontClassName}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJsScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AccountProvider>
            <CartProvider>{children}</CartProvider>
          </AccountProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
