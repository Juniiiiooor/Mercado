# Mercado do Bairro

E-commerce de mercado com vitrine editorial, autenticação e painel do cliente.
Projeto construído em **Next.js 16 (App Router) + React 19 + TypeScript**, sem
backend: os dados de catálogo são estáticos e o estado da conta fica no navegador.

<p align="center">
  <em>Tema escuro com acento cítrico · tipografia serifada editorial · fotos reais de acervos livres</em>
</p>

---

## Sumário

- [O que tem pronto](#o-que-tem-pronto)
- [Como rodar](#como-rodar)
- [Contas de demonstração](#contas-de-demonstração)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
- [Identidade visual](#identidade-visual)
- [Referências de design](#referências-de-design)
- [Decisões técnicas](#decisões-técnicas)
- [Imagens e licenças](#imagens-e-licenças)
- [Acessibilidade](#acessibilidade)
- [Publicando no GitHub](#publicando-no-github)
- [Próximos passos](#próximos-passos)

---

## O que tem pronto

**Vitrine (`/`)**
- Abertura em grade assimétrica com colagem de fotos editoriais e selo circular animado.
- Faixa rolante com a proposta da loja.
- Grade dos 6 corredores, com contagem de itens por categoria.
- Tarja de ofertas calculadas dinamicamente pelo maior desconto.
- Vitrine com "carregar mais" e cartão de produto interativo (adiciona e ajusta quantidade).
- Bloco de história em 3 passos, depoimentos e chamada para criação de conta.

**Catálogo (`/mercado`)**
- Busca por nome, marca e descrição.
- Filtros: corredor, teto de preço (slider) e "só ofertas".
- Ordenação por relevância, menor preço, maior preço e melhor avaliados.
- Paginação e estado vazio quando nada corresponde ao filtro.

**Produto (`/produto/[id]`)**
- Ficha com preço por unidade de medida, disponibilidade, modo de conservação.
- Sugestões de "combina com" e itens do mesmo corredor.
- Registra o produto em "vistos recentemente" (usado no painel).

**Cadastro e login**
- `/criar-conta`: validação de nome, e-mail, senha com medidor de força, máscara de telefone.
- `/entrar`: alterna entre entrar e criar conta na mesma tela.
- Sessão persistida no navegador; usuário logado vê atalho direto para o painel no cabeçalho.

**Tela principal do sistema (`/painel`)**
- Barra lateral com navegação e cartão do clube (pontos e nível).
- **Visão geral**: indicadores (pedidos, economia em promoções, pontos, cesta), recompras
  e destaques.
- **Catálogo**: busca e filtros rápidos por corredor, com adição à cesta.
- **Pedidos**: histórico com itens, status, barra de rastreio e botão "comprar de novo".
- **Minha conta**: edição de dados, endereço principal e preferências de tema.
- Redireciona para `/entrar` quando não há sessão.

**Extras**
- Carrinho lateral com barra de progresso do frete grátis, subtotal, taxa e desconto do clube.
- `/checkout` em 3 passos (identificação, entrega/pagamento, confirmação) com resumo fixo.
- `/receitas` com três preparos cujos ingredientes linkam para os produtos.
- `/lista` (lista de desejos) salva no navegador, com "adicionar tudo à cesta".
- Tema claro/escuro, `favicon` próprio, página 404 personalizada.

---

## Como rodar

```bash
# 1. dependências
npm install

# 2. ambiente de desenvolvimento
npm run dev
# abre em http://localhost:3000

# 3. build de produção
npm run build
npm start

# checagens
npm run lint
npm run typecheck
```

Requisitos: **Node.js 20 ou superior** (testado com Node 24).

Variáveis de ambiente: todas são opcionais. Copie `.env.example` para `.env.local`
se quiser ajustar a URL pública do site.

---

## Contas de demonstração

| E-mail | Senha | O que vem na conta |
| --- | --- | --- |
| `marina@exemplo.com` | `mercado123` | Clube Raiz, 780 pontos e 3 pedidos no histórico |
| `joao@exemplo.com` | `mercado123` | Clube Folha, 240 pontos e 1 pedido em rota |

Qualquer outro e-mail válido com senha de 8+ caracteres também entra, mas começa
sem pedidos. As senhas acima existem só para testes locais: em produção a
autenticação precisa acontecer no servidor.

---

## Estrutura de pastas

```
.
├── public/
│   ├── favicon.svg
│   └── img/
│       ├── products/          # 1 foto por produto, nome = id do produto
│       ├── editorial/         # fotos de capa, feira, padaria e mercado
│       └── credits.json       # autor e licença de cada imagem
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # fontes, metadados e providers globais
│   │   ├── globals.css        # tokens de design + componentes base
│   │   ├── layout.css         # cabeçalho, rodapé e carrinho lateral
│   │   ├── not-found.tsx      # página 404
│   │   ├── (site)/            # vitrine — cabeçalho e rodapé de loja
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                 # tela inicial
│   │   │   ├── mercado/page.tsx         # catálogo
│   │   │   ├── produto/[id]/page.tsx    # ficha do produto
│   │   │   ├── checkout/page.tsx
│   │   │   ├── receitas/page.tsx
│   │   │   ├── lista/page.tsx
│   │   │   └── *.css
│   │   ├── (auth)/            # entrar e criar conta
│   │   │   ├── auth.css
│   │   │   ├── entrar/page.tsx
│   │   │   └── criar-conta/page.tsx
│   │   └── (app)/             # área logada
│   │       ├── layout.tsx
│   │       ├── app.css
│   │       └── painel/page.tsx          # tela principal do sistema
│   │
│   ├── components/
│   │   ├── providers/         # tema, carrinho e conta (contexto + localStorage)
│   │   ├── layout/            # cabeçalho e rodapé da loja
│   │   ├── shop/              # cartão, vitrine, catálogo, ficha e checkout
│   │   ├── dashboard/         # tela principal do sistema
│   │   ├── auth/              # formulários de acesso
│   │   └── ui/icons.tsx       # ícones em SVG (sem biblioteca externa)
│   │
│   ├── data/
│   │   ├── products.ts        # catálogo (25 produtos) + helpers
│   │   ├── categories.ts      # 6 corredores
│   │   └── demo-accounts.ts   # contas de teste com histórico
│   │
│   ├── lib/
│   │   ├── format.ts          # moeda, datas, frete e totais
│   │   ├── validation.ts      # validações e máscaras dos formulários
│   │   ├── storage.ts         # acesso seguro ao localStorage
│   │   ├── use-persistent-state.ts  # estado persistido, hidratação segura
│   │   ├── use-hydrated-value.ts    # leitura do navegador pós-hidratação
│   │   ├── fonts.ts            # fontes do Next (Fraunces, Inter, JetBrains Mono)
│   │   ├── contracts.ts       # tipos da fronteira entre UI e dados
│   │   └── account-client.ts  # camada que simula a API de conta
│   │
│   └── types/domain.ts        # Product, Order, User, Category…
│
├── .github/workflows/
│   └── test.yml               # CI: typecheck + lint + build
│
├── eslint.config.mjs
├── next.config.ts
├── vercel.json                # deploy (framework, região, headers)
├── tsconfig.json
└── .gitignore
```

---

## Rotas

| Rota | Grupo | Descrição |
| --- | --- | --- |
| `/` | `(site)` | Página inicial com vitrine, categorias, ofertas e história |
| `/mercado` | `(site)` | Catálogo com busca, filtros, ordenação e paginação |
| `/produto/[id]` | `(site)` | Ficha do produto (25 páginas pré-renderizadas) |
| `/receitas` | `(site)` | Receitas com lista de compras clicável |
| `/lista` | `(site)` | Lista de desejos local |
| `/checkout` | `(site)` | Fechamento de pedido em 3 passos |
| `/entrar` | `(auth)` | Login (e cadastro alternativo) |
| `/criar-conta` | `(auth)` | Cadastro completo |
| `/painel` | `(app)` | Tela principal do sistema (requer sessão) |

Atalhos com parâmetros: `/mercado?categoria=hortifruti`, `/mercado?busca=azeite`.

---

## Identidade visual

O pedido era **"escuro com acento cítrico"** e uma aparência que não parecesse
template gerado automaticamente. As escolhas abaixo servem a isso.

### Paleta

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#0b0c0a` | Fundo (quase preto, levemente esverdeado) |
| `--bg-soft` | `#101210` | Faixas e rodapé |
| `--panel` | `#161814` | Cartões |
| `--panel-2` | `#1c1f1a` | Painéis elevados |
| `--citrus` | `#d7f45c` | Ação principal, preço em oferta, foco |
| `--citrus-ink` | `#171a10` | Texto sobre o cítrico |
| `--ink` | `#f4f5ef` | Texto principal |
| `--berry` | `#e2603f` | Erros e selo de desconto |
| `--gold` | `#e8b53c` | Avaliações |

O tema claro reaproveita os mesmos nomes de token, trocando só os valores —
é por isso que alternar tema não quebra nenhum componente.

### Tipografia

| Papel | Fonte | Onde aparece |
| --- | --- | --- |
| Títulos | **Fraunces** (serifa variável, com eixo *wonk*) | `h1`–`h4`, números grandes |
| Texto e interface | **Inter** | corpo, botões, formulários |
| Rótulos e dados | **JetBrains Mono** | preços, categorias, IDs de pedido |

Detalhes que afastam o resultado do "cara de IA":
- Itálico da serifa como acento de ênfase, em vez de gradiente colorido.
- Rótulos monoespaçados em caixa alta (`eyebrow`) marcando cada seção.
- Textura de grão sutil sobre o fundo (SVG `feTurbulence` a 5% de opacidade).
- Selo circular com texto curvo girando devagar na abertura.
- Números tabulares (`font-variant-numeric`) para que colunas de preço não dancem.
- Cantos: botões e chips em pílula, cartões em 18 px — mistura proposital.

---

## Referências de design

Pesquisa feita antes de escrever a primeira linha de CSS:

- **Instacart** — estrutura de busca, corredores e cartões arredondados para
  compra de mercado. Aprendizado aproveitado: manter busca e categorias sempre
  visíveis e com alvos de toque grandes.
- **Subframe — 25 Grocery Website Design Examples** — variedade de vitrines
  de supermercado; ajudou a definir o que evitar (excesso de banners e badges).
- **Figma Community — Food Store / Ecommerce Shop UI** — hierarquia de vitrine,
  selo de desconto e bloco de categorias.
- **Grocery, Copenhague** (identidade com monoespaçada utilitária) — origem do
  uso de `JetBrains Mono` em rótulos e preços.
- **Turbo Grocery & Deli** e a curadoria do **landing.love** — referência de
  tom: loja com personalidade em vez de marketplace genérico.
- **Muzli — Dark mode UI 2026** e **Awwwards 2025–2030** — padrões de fundo
  escuro com acento e uso de tipografia editorial em blocos cinematográficos.

O que foi deliberadamente descartado por ser "cara de IA": gradientes roxo/azul,
glassmorphism, emojis como ícones de navegação, sombras coloridas difusas e
títulos em caixa alta com espaçamento exagerado.

---

## Decisões técnicas

**Sem dependências de UI.** Não há Tailwind, nem biblioteca de componentes. Todo
o estilo vive em quatro folhas CSS com tokens, o que mantém o bundle pequeno e
o código auditável. Os ícones são SVG desenhados à mão em
`src/components/ui/icons.tsx`.

**Grupos de rota em vez de condicionais.** `(site)`, `(auth)` e `(app)` têm
layouts diferentes sem que nenhuma página saiba disso. O painel não carrega
cabeçalho de loja, e as telas de acesso não carregam rodapé.

**Estado no cliente, isolado em providers.**
- `ThemeProvider` — tema claro/escuro salvo no `localStorage`.
- `CartProvider` — linhas do carrinho, totais, frete e desconto.
- `AccountProvider` — sessão, histórico de pedidos e criação de pedido.
- `src/lib/account-client.ts` simula latência de rede. Para ligar um backend,
  troque o corpo dessas funções por `fetch`: os tipos de retorno (`User`,
  `Order`) já são os de domínio.

**Preço calculado em um só lugar.** `src/lib/format.ts` concentra frete grátis
(R$ 120), taxa (R$ 9,90) e desconto do clube (5% acima de R$ 150). Carrinho,
checkout e painel leem daí, então os três nunca divergem.

**Catálogo tipado.** O `id` de cada produto é o nome do arquivo de imagem.
Isso garante que foto e produto não se desencontrem e facilita revisar o
catálogo em `src/data/products.ts`.

**Cuidados de hidratação.** O site renderiza no servidor e continua no navegador.
Se algo salvo no `localStorage` fosse lido durante o render, o HTML do servidor e
o do cliente sairiam diferentes e a hidratação quebraria. Para evitar isso sem
`setState` dentro de efeito (que gera render em cascata), usamos
`useSyncExternalStore` por trás de dois hooks:

- `src/lib/use-persistent-state.ts` — leitura e escrita de um valor persistido
  (carrinho, conta, pedidos, itens vistos), compartilhando uma mesma store por
  chave para manter as telas em sincronia. O servidor devolve o valor padrão; o
  navegador só recebe o valor salvo depois da hidratação.
- `src/lib/use-hydrated-value.ts` — expõe `useMounted()` para as telas que
  precisam esperar o estado salvo antes de pintar.

O tema vive em `<html data-theme>` (aplicado por um script inline no `layout.tsx`),
então já está correto antes mesmo do React assumir.

**`<img>` em vez de `next/image`.** As fotos são arquivos locais em
`public/img`, servidos diretamente. Otimizar com `next/image` exigiria
configuração de domínios e processamento extra sem ganho real aqui, então a regra
`@next/next/no-img-element` está desligada no `eslint.config.mjs` — a decisão
está registrada nesse arquivo.

---

## Imagens e licenças

As fotos são reais e de acervos livres, escolhidas para corresponder ao produto
de cada ficha. Os metadados completos estão em `public/img/credits.json`.

Acervos usados: **Wikimedia Commons** (CC0, CC BY, CC BY-SA, domínio público) e
**Flickr** (via Openverse). Nenhuma imagem é gerada por IA.

**Produtos** (`public/img/products/`)

| Produto | Arquivo original | Autor(a) | Licença |
| --- | --- | --- | --- |
| Banana-prata | Bananas on black background 02 | Krzysztof Golik | CC BY-SA 4.0 |
| Tomate italiano | Ripe Red Tomatoes | Glenda Green | CC0 |
| Abacate Hass | Avocado Hass – single and halved | Ivar Leidus | CC BY-SA 4.0 |
| Morango | Organic-strawberries Canada | Marc-Lautenbacher | CC BY-SA 4.0 |
| Cebola | Mixed onions | Colin | CC BY-SA 3.0 |
| Alface crespa | Lettuce in a stack | Jeffery Martin | CC0 |
| Pão de fermentação | Sourdough Bread Loaf | Agelaia | CC BY 4.0 |
| Croissant de manteiga | All butter croissant and latte | Andy Li | CC0 |
| Café especial | Roasted coffee beans | MarkSweep | Domínio público |
| Arroz integral | Brown rice (whole grain rice) | Billjones94 | CC BY-SA 4.0 |
| Azeite extravirgem | Classic Extra-Virgin Olive Oil | Caroliusa | CC BY-SA 4.0 |
| Mel silvestre | Dipper stick and honey in a jar | Shixart1985 | CC BY 2.0 |
| Ovos caipiras | Egg cartons with chicken eggs 01 | Krzysztof Golik | CC BY-SA 4.0 |
| Leite integral | Glass Milk Bottles | Pkgx | CC BY-SA 4.0 |
| Queijo Minas | Queijo Minas Frescal | Hellkt | Domínio público |
| Iogurte natural | Joghurt | Rainer Zenz | CC BY-SA 3.0 |
| Manteiga | Block of butter 20200928 | Salicyna | CC BY-SA 4.0 |
| Suco de laranja | Orange juice 1 edit1 | USDA (ed. Arad) | Domínio público |
| Cerveja artesanal | Beer bottles 2018 G1 | George Chernilevsky | Domínio público |
| Kombucha | Kombucha Store Shelves | SamHolt6 | CC BY-SA 4.0 |
| Água de coco | Coconut Juice | SarKaLay | CC0 |
| Peito de frango | CHICKEN BREAST | MrBeastRapper | CC BY-SA 4.0 |
| Picanha | Picanha (14759358544) | Christian Benseler | CC BY 2.0 |
| Linguiça artesanal | Linguiça calabresa, São Paulo | Wilfredor | CC0 |
| Filé de tilápia | Tilapia Fish | Nana Pearls | CC0 |

**Editoriais** (`public/img/editorial/`)

| Arquivo | Original | Autor(a) | Licença |
| --- | --- | --- | --- |
| `hero-mercado` | Outdoor market fruit and vegetable stall, Romford | Acabashi | CC BY-SA 4.0 |
| `feira` | Fruit and vegetable stall at Southside Farmers Market | Nick-D | CC BY-SA 4.0 |
| `padaria` | A display of Scali bread at the Winter Hill Bakery | Mmangan333 | CC BY-SA 4.0 |
| `mercado-municipal` | Municipal Market of São Paulo city | Wilfredor | CC BY-SA 4.0 |

> **Ao publicar um projeto real, troque as fotos por material próprio.** As
> licenças acima exigem atribuição (CC BY e CC BY-SA); o arquivo
> `credits.json` e esta tabela cumprem esse papel.

---

## Acessibilidade

- Estrutura semântica: `header`, `nav`, `main`, `section` com `aria-labelledby`,
  `footer` e um `skip-link` para o conteúdo.
- Todo controle é `<button>` ou `<a>` de verdade — nada de `div` clicável.
- Foco visível em cítrico com `:focus-visible` em todos os elementos.
- Carrinho lateral e menu móvel fecham com `Esc`; o fundo não rola enquanto o
  carrinho está aberto.
- Status do carrinho em `aria-live="polite"`, botões de quantidade com rótulos
  descritivos ("aumentar quantidade de Morango").
- Contraste: texto claro sobre fundo escuro acima de 7:1; o cítrico é reservado
  para acentos e elementos de ação.
- `prefers-reduced-motion` desliga o selo giratório e a faixa rolante.

---

## Publicando no GitHub

O `.gitignore` cobre `node_modules`, `.next`, arquivos `.env`, logs e pastas de
editor. As imagens em `public/` **são versionadas** — são necessárias para o site
funcionar.

O repositório já está publicado em
[github.com/Juniiiiooor/Mercado](https://github.com/Juniiiiooor/Mercado), com duas
branches:

- **`main`** — versão estável, é a que vai para produção.
- **`dev`** — trabalho em andamento; as mudanças chegam na `main` por pull request.

```bash
# clonar
git clone git@github.com:Juniiiiooor/Mercado.git
cd Mercado

# trabalhar sempre na dev
git checkout dev
# ...editar...
git add .
git commit -m "feat: descreva a mudança"
git push
```

### Deploy na Vercel

O projeto está pronto para deploy contínuo: a cada `push`, a Vercel reconstrói o
site. A configuração fica em `vercel.json` (framework `nextjs`, região `gru1` —
São Paulo — e cabeçalhos de segurança).

Para ligar o repositório à Vercel:

1. Acesse [vercel.com/new](https://vercel.com/new) e importe
   `Juniiiiooor/Mercado`.
2. O preset de **Next.js** é detectado sozinho; não mexa em build nem output.
3. Em *Settings → Git*, defina **Production Branch** como `main`. Assim a `dev`
   gera **Preview Deployments** (URLs de teste em cada push) e só a `main` publica
   em produção.
4. Se for usar domínio próprio, defina `NEXT_PUBLIC_SITE_URL` com a URL final.
5. Deploy. O build roda `next build` e gera as 25 fichas de produto como páginas
   estáticas.

> Alternativa por linha de comando: `npx vercel` (a primeira execução pede login e
> vincula o projeto). Requer o Vercel CLI, que não vem instalado por padrão.

---

## Testes automáticos (GitHub Actions)

O workflow [`.github/workflows/test.yml`](.github/workflows/test.yml) roda sozinho
a cada `push` e em todo pull request. Ele executa, nesta ordem:

1. `npm run typecheck` — checagem de tipos do TypeScript;
2. `npm run lint` — análise estática do ESLint;
3. `npm run build` — build de produção, que também pré-renderiza as 25 fichas.

Se qualquer passo falhar, o **check fica vermelho** e o pull request não deve ser
mesclado. Também há cache do npm e cancelamento automático de execuções antigas da
mesma branch.

Para rodar exatamente o que o CI roda, antes de dar `push`:

```bash
npm run typecheck && npm run lint && npm run build
```

### Bloquear o merge de verdade (proteção de branch)

O workflow aponta o erro, mas quem impede o merge é uma regra de proteção no
GitHub. Configure uma vez, no repositório:

1. **Settings → Branches → Add branch protection rule**.
2. Em *Branch name pattern*, use `main` (repita para `dev` se quiser proteger
   também).
3. Marque **Require a pull request before merging**.
4. Marque **Require status checks to pass before merging** e selecione o check
   **“Verificar código”** (nome do job do workflow).
5. Salve. A partir daí, um PR só é mesclado com o CI verde.

---

## Próximos passos

Sugestões para evoluir a partir desta base:

1. **Backend real** — substituir `account-client.ts` por rotas de API
   (`/api/auth`, `/api/orders`) com hash de senha (bcrypt ou argon2) e sessão
   em cookie `httpOnly`.
2. **Banco de dados** — migrar `src/data/products.ts` para Postgres/Prisma,
   mantendo os mesmos tipos.
3. **Pagamento** — integrar Pix e cartão via provedor (Stripe, Mercado Pago)
   no passo de pagamento do checkout.
4. **Busca** — trocar o filtro em memória por busca indexada quando o catálogo
   passar de algumas centenas de itens.
5. **Testes** — adicionar Vitest para `lib/format.ts` e Playwright para o fluxo
   completo de compra.
6. **Fotos próprias** — fotografar os produtos reais da loja e atualizar
   `credits.json`.

---

Feito para a aula de prototipação com IA. Código sob MIT; imagens conforme as
licenças listadas acima.
