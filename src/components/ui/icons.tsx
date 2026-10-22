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
