import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    rules: {
      // Usamos `<img>` de propósito: as fotos do catálogo são arquivos locais
      // em `public/img` e são servidas sem passar pelo otimizador do Next (que
      // exigiria `next/image` + configuração de domínios). A decisão está
      // registrada no README.
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
];

export default eslintConfig;
