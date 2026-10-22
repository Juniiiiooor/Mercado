"use client";

/// <reference types="react" />

import { createElement, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  /** Classes aplicadas ao elemento `svg`. */
  className?: string;
  /** Rótulo acessível; quando ausente o ícone é decorativo. */
  title?: string;
};

function Svg({ children, className, title, viewBox = "0 0 24 24" }: Props & { viewBox?: string }) {
  return createElement(
    "svg",
    {
      className,
      viewBox,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      role: title ? "img" : undefined,
      "aria-hidden": title ? undefined : true,
      "aria-label": title,
      focusable: "false",
    },
    title ? createElement("title", null, title) : null,
    children,
  );
}

export function IconCart(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 5h2.2l.9 3m0 0 1.6 6.2A2 2 0 0 0 9.6 16h7.9a2 2 0 0 0 1.9-1.4L21 8H6.1Z" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
    </Svg>
  );
}

export function IconUser(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.6-3.2 3.5-5 7-5s6.4 1.8 7 5" />
    </Svg>
  );
}

export function IconSearch(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Svg>
  );
}

export function IconMenu(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconClose(props: Props) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function IconArrowRight(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
    </Svg>
  );
}

export function IconArrowLeft(props: Props) {
  return (
    <Svg {...props}>
      <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />
    </Svg>
  );
}

export function IconLeaf(props: Props) {
  return (
    <Svg {...props}>
      <path d="M5 19c0-7 4.6-12 14-12 0 8-4.8 12-11 12H5Z" />
      <path d="M8 16c1.8-2.2 4-3.8 7-4.6" />
    </Svg>
  );
}

export function IconClock(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.6 1.6" />
    </Svg>
  );
}

export function IconTruck(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.4" />
      <circle cx="17" cy="18" r="1.4" />
    </Svg>
  );
}

export function IconPin(props: Props) {
  return (
    <Svg {...props}>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </Svg>
  );
}

export function IconCheck(props: Props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.4 4.5L19 7" />
    </Svg>
  );
}

export function IconStar(props: Props) {
  return (
    <Svg {...props}>
      <path d="m12 4.5 2.3 4.9 5.2.7-3.8 3.7.9 5.2-4.6-2.5-4.6 2.5.9-5.2L4.5 10l5.2-.7z" />
    </Svg>
  );
}

export function IconSpinner(props: Props) {
  return (
    <Svg {...props} viewBox="0 0 24 24">
      <path d="M12 4a8 8 0 1 0 8 8" />
    </Svg>
  );
}

export function IconLogout(props: Props) {
  return (
    <Svg {...props}>
      <path d="M14 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
      <path d="M17 12H10m7 0-2.6-2.6M17 12l-2.6 2.6" />
    </Svg>
  );
}

export function IconBag(props: Props) {
  return (
    <Svg {...props}>
      <path d="M5.5 8h13l-1 12h-11z" />
      <path d="M9 8V6.6A3 3 0 0 1 12 3.6a3 3 0 0 1 3 3V8" />
    </Svg>
  );
}

export function IconSun(props: Props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" />
    </Svg>
  );
}

export function IconMoon(props: Props) {
  return (
    <Svg {...props}>
      <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Svg>
  );
}

/* ---- Ícones dos corredores (categorias) — traço próprio, sem emoji ---- */

/** Hortifrúti: folha com nervura central. */
export function IconCategoryLeaf(props: Props) {
  return (
    <Svg {...props}>
      <path d="M20 4c0 8.5-4.6 13.4-12 13.4A4 4 0 0 1 4 13.4C4 6.2 9.8 4 20 4Z" />
      <path d="M4.5 19.5C7 14.5 11 11 16.5 8.5" />
      <path d="M9.5 14.2c-.6-1.4-.9-2.9-.9-4.5M13.6 11c.5 1 .8 2 .9 3.1" />
    </Svg>
  );
}

/** Padaria: pão de fermentação natural com cortes na casca. */
export function IconCategoryBread(props: Props) {
  return (
    <Svg {...props}>
      <path d="M4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5c0 1.3-1 2.3-2.3 2.3H6.3C5 14.8 4 13.8 4 12.5Z" />
      <path d="M6.5 14.8 7 19m5-4.2V19m5.3-4.2.4 4.2" />
      <path d="M8.2 10.6c.9-1 2.3-1.6 3.8-1.6s2.9.6 3.8 1.6" />
    </Svg>
  );
}

/** Frios e laticínios: cunha de queijo com furos. */
export function IconCategoryCheese(props: Props) {
  return (
    <Svg {...props}>
      <path d="M3 15.5 14 5l7 4.6v4.9c0 .8-.7 1.5-1.5 1.5H4.5C3.7 16 3 15.5 3 15.5Z" />
      <path d="M3 15.5V12l11-7 7 4.6" />
      <circle cx="8.4" cy="13.2" r="0.9" />
      <circle cx="13.6" cy="11.4" r="1.1" />
      <circle cx="16.8" cy="14.2" r="0.8" />
    </Svg>
  );
}

/** Mercearia: pote de conserva com tampa e etiqueta. */
export function IconCategoryJar(props: Props) {
  return (
    <Svg {...props}>
      <path d="M7 8h10v10.2a1.8 1.8 0 0 1-1.8 1.8H8.8A1.8 1.8 0 0 1 7 18.2V8Z" />
      <path d="M6.2 4.6h11.6v3.4H6.2z" />
      <path d="M9.6 12.4h4.8M9.6 15.2h3" />
    </Svg>
  );
}

/** Bebidas: garrafa com rótulo. */
export function IconCategoryBottle(props: Props) {
  return (
    <Svg {...props}>
      <path d="M10 3h4v3.2c0 .6.3 1.2.8 1.6l.3.3c.6.5 1 1.3 1 2.1v9.6A1.2 1.2 0 0 1 14.9 21H9.1A1.2 1.2 0 0 1 8 19.8v-9.6c0-.8.3-1.6 1-2.1l.2-.3c.5-.4.8-1 .8-1.6V3Z" />
      <path d="M8.4 3h7.2M8.2 12.6h7.6" />
    </Svg>
  );
}

/** Açougue e peixaria: corte de carne com osso. */
export function IconCategoryMeat(props: Props) {
  return (
    <Svg {...props}>
      <path d="M14.5 4.5c3.4 0 5.6 2.2 5.6 5.3 0 4.6-3.6 7.2-6.6 9.4-1 .7-2 1.3-3.2 1.3-2 0-3.6-1.5-3.6-3.5 0-1.5.8-2.6 1.9-3.9" />
      <path d="M8.6 9.7c1.2-1.4 2.6-2.7 4.1-3.7" />
      <circle cx="8.9" cy="15.1" r="3.1" />
    </Svg>
  );
}
