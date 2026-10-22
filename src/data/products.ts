import type { Product } from "@/types/domain";

/**
 * Catálogo da demo.
 *
 * Regra de curadoria: o `id` é o mesmo nome do arquivo em
 * `public/img/products/<id>.jpg`, então a foto sempre corresponde ao produto.
 * Os créditos e licenças de cada imagem ficam em `public/img/credits.json`
 * e estão listados no README.
 */
export const products: Product[] = [
  // ---------------------------------------------------------------- Hortifrúti
  {
    id: "banana-prata",
    name: "Banana-prata",
    brand: "Sítio Boa Esperança",
    category: "hortifruti",
    price: 6.9,
    compareAt: 8.4,
    unit: "kg",
    size: 1,
    tags: ["Colhida na semana"],
    description:
      "Penca de banana-prata em ponto de consumo, com casca firme e doçura equilibrada. Ideal para a fruteira da semana e para receitas que pedem banana mais consistente.",
    storage: "Conserve fora da geladeira. Separe da penca o que for consumir primeiro.",
    stock: 48,
    rating: 4.8,
    reviews: 216,
    featured: true,
    pairing: ["morango", "iogurte-natural", "mel-silvestre"],
  },
  {
    id: "tomate-italiano",
    name: "Tomate italiano",
    brand: "Estufa Vale Verde",
    category: "hortifruti",
    price: 12.5,
    unit: "kg",
    size: 1,
    tags: ["Safra"],
    description:
      "Tomate alongado, de polpa densa e pouca semente, colhido maduro. Rende molho encorpado sem precisar de concentrado.",
    storage: "Deixe em local ventilado e longe do sol direto. Evite geladeira antes de madurar.",
    stock: 32,
    rating: 4.6,
    reviews: 148,
    featured: true,
    pairing: ["azeite-extra-virgem", "queijo-minas", "alface-crespa"],
  },
  {
    id: "abacate-hass",
    name: "Abacate Hass",
    brand: "Fazenda Alto da Serra",
    category: "hortifruti",
    price: 24.9,
    compareAt: 29.9,
    unit: "kg",
    size: 1,
    description:
      "Abacate de casca escura e cremosidade alta. Vem em ponto que amadurece em dois dias na fruteira.",
    storage: "Amadurece em 1 a 3 dias fora da geladeira. Depois de maduro, guarde na parte baixa.",
    stock: 26,
    rating: 4.7,
    reviews: 97,
    featured: true,
    pairing: ["pao-fermentacao", "tomate-italiano"],
  },
  {
    id: "morango",
    name: "Morango",
    brand: "Cooperativa Serra Azul",
    category: "hortifruti",
    price: 19.9,
    unit: "cx",
    size: 300,
    tags: ["Sem agrotóxico"],
    description:
      "Caixa com morangos graúdos, doces e firmes, colhidos de manhã e embalados no mesmo dia.",
    storage: "Só lave na hora de comer. Na geladeira, forre com papel-toalha e não amontoe.",
    stock: 18,
    rating: 4.9,
    reviews: 302,
    featured: true,
    pairing: ["iogurte-natural", "leite-integral", "mel-silvestre"],
  },
  {
    id: "cebola",
    name: "Cebola nacional",
    brand: "Mercado do Bairro",
    category: "hortifruti",
    price: 7.4,
    unit: "kg",
    size: 1,
    description:
      "Cebola de casca seca e firme, com boa conservação. Base de praticamente todo refogado.",
    storage: "Guarde em cesto aberto, ao abrigo da luz. Não guarde junto com batata.",
    stock: 60,
    rating: 4.5,
    reviews: 88,
    pairing: ["linguica-artesanal", "tomate-italiano"],
  },
  {
    id: "alface-crespa",
    name: "Alface crespa",
    brand: "Horta Comunitária Vila Nova",
    category: "hortifruti",
    price: 5.5,
    unit: "un",
    size: 1,
    description:
      "Pé de alface crespa lavado, com folhas crocantes e miolo fechado. Colhido à sombra para não amargar.",
    storage: "Envolva em pano limpo úmido e guarde na gaveta de verduras.",
    stock: 40,
    rating: 4.4,
    reviews: 61,
    pairing: ["tomate-italiano", "queijo-minas"],
  },

  // ------------------------------------------------------------------ Padaria
  {
    id: "pao-fermentacao",
    name: "Pão de fermentação natural",
    brand: "Fornada do Zé",
    category: "padaria",
    price: 18.9,
    unit: "un",
    size: 800,
    tags: ["Fermentação de 24h"],
    description:
      "Massa de farinha tipo 1, água, sal e fermento natural, com 24 horas de descanso e casca cor de cobre.",
    storage: "Melhor no dia. Para reaquecer, 5 minutos em forno a 180 °C devolvem a casca crocante.",
    stock: 12,
    rating: 4.9,
    reviews: 189,
    featured: true,
    pairing: ["manteiga", "queijo-minas", "cafe-especial"],
  },
  {
    id: "croissant-manteiga",
    name: "Croissant de manteiga",
    brand: "Fornada do Zé",
    category: "padaria",
    price: 9.5,
    unit: "un",
    size: 1,
    description:
      "Laminado à mão, com manteiga de primeira qualidade e 27 camadas. Assado duas vezes por dia.",
    storage: "Consumir no dia. Congela bem por até 30 dias.",
    stock: 24,
    rating: 4.8,
    reviews: 142,
    pairing: ["cafe-especial", "leite-integral"],
  },
  {
    id: "cafe-especial",
    name: "Café especial torra média",
    brand: "Torrefação Alto Cafezal",
    category: "padaria",
    price: 42.9,
    compareAt: 49.9,
    unit: "pct",
    size: 250,
    tags: ["Nota 86", "Grãos 100% arábica"],
    description:
      "Grãos de altitude com notas de cacau e caramelo. Ponto de torra pensado para coado e espresso.",
    storage: "Mantenha fechado, longe de luz e umidade. Melhor consumo em até 45 dias.",
    stock: 35,
    rating: 4.9,
    reviews: 264,
    featured: true,
    pairing: ["pao-fermentacao", "croissant-manteiga"],
  },

  // ----------------------------------------------------------- Frios e laticínios
  {
    id: "leite-integral",
    name: "Leite integral",
    brand: "Granja Três Irmãos",
    category: "laticinios",
    price: 7.9,
    unit: "L",
    size: 1,
    description:
      "Leite de vacas em pasto, apenas pasteurizado, sem reconstituição de pó. Sabor mais encorpado.",
    storage: "Geladeira entre 2 °C e 4 °C. Consumir em até 5 dias após abrir.",
    stock: 30,
    rating: 4.7,
    reviews: 176,
    featured: true,
    pairing: ["cafe-especial", "queijo-minas"],
  },
  {
    id: "queijo-minas",
    name: "Queijo Minas frescal",
    brand: "Queijaria Serra do Mar",
    category: "laticinios",
    price: 29.9,
    unit: "kg",
    size: 1,
    tags: ["Feito no dia"],
    description:
      "Queijo frescal de massa branca, textura macia e leve acidez. Produzido duas vezes por semana.",
    storage: "Guardar em soro próprio ou pano limpo na geladeira. Consumir em 7 dias.",
    stock: 16,
    rating: 4.8,
    reviews: 133,
    featured: true,
    pairing: ["pao-fermentacao", "tomate-italiano", "mel-silvestre"],
  },
  {
    id: "iogurte-natural",
    name: "Iogurte natural",
    brand: "Cooperativa Serra Azul",
    category: "laticinios",
    price: 12.9,
    unit: "pct",
    size: 500,
    tags: ["Sem açúcar"],
    description:
      "Iogurte integral de fermentação lenta, sem açúcar e sem espessantes. Duas cepas apenas.",
    storage: "Geladeira. Sobra de iogurte serve de fermento para a próxima receita caseira.",
    stock: 42,
    rating: 4.6,
    reviews: 205,
    pairing: ["morango", "mel-silvestre", "arroz-integral"],
  },
  {
    id: "manteiga",
    name: "Manteiga com sal",
    brand: "Queijaria Serra do Mar",
    category: "laticinios",
    price: 34.9,
    compareAt: 39.9,
    unit: "pct",
    size: 200,
    tags: ["Sem corante"],
    description:
      "Batelada de creme de leite, com sal marinho e nenhum corante. Cor mais pálida, sabor mais limpo.",
    storage: "Geladeira. Fora dela, dura apenas alguns dias em clima fresco.",
    stock: 22,
    rating: 4.9,
    reviews: 158,
    pairing: ["pao-fermentacao", "croissant-manteiga"],
  },
  {
    id: "ovos-caipiras",
    name: "Ovos caipiras",
    brand: "Granja Ninho Verde",
    category: "laticinios",
    price: 18.9,
    unit: "dz",
    size: 1,
    tags: ["Galinha livre"],
    description:
      "Dúzia de ovos de galinhas criadas soltas, com gema mais alaranjada e casca de espessura firme. Ideais para ovo mexido, bolos e para o café da manhã.",
    storage: "Geladeira, na embalagem original. Consumir em até 3 semanas.",
    stock: 40,
    rating: 4.8,
    reviews: 187,
    featured: true,
    pairing: ["pao-fermentacao", "manteiga", "queijo-minas"],
  },

  // ---------------------------------------------------------------- Mercearia
  {
    id: "arroz-integral",
    name: "Arroz integral agulhinha",
    brand: "Cooperativa Terra Viva",
    category: "mercearia",
    price: 21.9,
    unit: "pct",
    size: 1,
    tags: ["Grão inteiro"],
    description:
      "Arroz integral de grão longo, com farelo preservado. Solta bem quando lavado e refogado antes do cozimento.",
    storage: "Pote fechado, ao abrigo da luz. Consumir em até 6 meses.",
    stock: 55,
    rating: 4.5,
    reviews: 94,
    pairing: ["peito-de-frango", "alface-crespa"],
  },
  {
    id: "azeite-extra-virgem",
    name: "Azeite extravirgem",
    brand: "Olival Família Bertoldi",
    category: "mercearia",
    price: 56.9,
    compareAt: 68.9,
    unit: "ml",
    size: 500,
    tags: ["Acidez 0,2%", "Primeira prensagem"],
    description:
      "Azeite de primeira extração a frio, colhido no início da safra. Picante no fim da boca, ideal para finalizar pratos.",
    storage: "Frasco fechado, longe do fogão e da luz. Calor acelera a perda de aroma.",
    stock: 28,
    rating: 4.9,
    reviews: 221,
    featured: true,
    pairing: ["tomate-italiano", "pao-fermentacao"],
  },
  {
    id: "mel-silvestre",
    name: "Mel silvestre",
    brand: "Apiário Flor da Mata",
    category: "mercearia",
    price: 38.5,
    unit: "pct",
    size: 500,
    tags: ["Cru", "Sem pasteurizar"],
    description:
      "Mel de florada mista, filtrado a frio para manter aroma e enzimas. Cristaliza naturalmente no frio.",
    storage: "Ambiente seco. Se cristalizar, aqueça o pote em banho-maria morno.",
    stock: 20,
    rating: 4.8,
    reviews: 119,
    pairing: ["queijo-minas", "iogurte-natural", "morango"],
  },

  // ------------------------------------------------------------------ Bebidas
  {
    id: "suco-de-laranja",
    name: "Suco de laranja integral",
    brand: "Sítio Bela Vista",
    category: "bebidas",
    price: 16.9,
    unit: "L",
    size: 1,
    tags: ["Sem conservante"],
    description:
      "Laranja-pêra espremida no dia, sem água e sem açúcar. Precisa de geladeira do começo ao fim.",
    storage: "Gelado, consumir em até 3 dias após abrir.",
    stock: 25,
    rating: 4.7,
    reviews: 131,
    pairing: ["pao-fermentacao", "ovos-caipiras"],
  },
  {
    id: "cerveja-artesanal",
    name: "Cerveja pilsen artesanal",
    brand: "Cervejaria Bairro Alto",
    category: "bebidas",
    price: 12.9,
    unit: "un",
    size: 500,
    tags: ["Lote pequeno"],
    description:
      "Pilsen de baixa fermentação, lupulada na medida, com final seco e refrescante. Vendida a partir de 18 anos.",
    storage: "Conservar deitada, em local fresco e escuro.",
    stock: 72,
    rating: 4.6,
    reviews: 87,
    pairing: ["picanha", "linguica-artesanal"],
  },
  {
    id: "kombucha-gengibre",
    name: "Kombucha de gengibre",
    brand: "Fermentaria Vila Nova",
    category: "bebidas",
    price: 14.9,
    unit: "un",
    size: 400,
    tags: ["Fermentado vivo"],
    description:
      "Chá verde fermentado com gengibre fresco. Azedinho, pouco doce e naturalmente gaseificado.",
    storage: "Geladeira. A tampa pode soltar gás; abra com cuidado.",
    stock: 34,
    rating: 4.5,
    reviews: 76,
    pairing: ["alface-crespa", "tilapia"],
  },
  {
    id: "agua-de-coco",
    name: "Água de coco",
    brand: "Coqueiral do Norte",
    category: "bebidas",
    price: 9.9,
    unit: "L",
    size: 1,
    tags: ["Natural"],
    description:
      "Extração a frio do coco verde, sem conservantes. Sabor suave e levemente adocicado.",
    storage: "Uma vez aberta, mantenha gelada e consuma em 24 horas.",
    stock: 44,
    rating: 4.6,
    reviews: 103,
    pairing: ["peito-de-frango", "banana-prata"],
  },

  // ----------------------------------------------------- Açougue e peixaria
  {
    id: "peito-de-frango",
    name: "Peito de frango",
    brand: "Granja Três Irmãos",
    category: "proteinas",
    price: 27.9,
    unit: "kg",
    size: 1,
    tags: ["Sem antibiótico"],
    description:
      "Filé de peito sem osso, de aves criadas soltas e sem uso preventivo de antibiótico.",
    storage: "Geladeira por até 2 dias ou congelado por 3 meses.",
    stock: 30,
    rating: 4.7,
    reviews: 168,
    featured: true,
    pairing: ["arroz-integral", "agua-de-coco"],
  },
  {
    id: "picanha",
    name: "Picanha bovina",
    brand: "Casa de Carnes Bairro",
    category: "proteinas",
    price: 89.9,
    compareAt: 104.9,
    unit: "kg",
    size: 1,
    tags: ["Maturidade 21 dias"],
    description:
      "Picanha com capa de gordura preservada, maturada 21 dias e cortada na espessura que você pedir no balcão.",
    storage: "Consumir em até 3 dias na geladeira. Congele já porcionada.",
    stock: 14,
    rating: 4.9,
    reviews: 241,
    featured: true,
    pairing: ["cerveja-artesanal", "cebola"],
  },
  {
    id: "linguica-artesanal",
    name: "Linguiça artesanal",
    brand: "Casa de Carnes Bairro",
    category: "proteinas",
    price: 39.9,
    unit: "kg",
    size: 1,
    tags: ["Defumada em casa"],
    description:
      "Linguiça toscana de produção própria, temperada com alho, sal e pimenta-do-reino moída na hora.",
    storage: "Geladeira por até 4 dias ou congelada por 2 meses.",
    stock: 18,
    rating: 4.8,
    reviews: 156,
    pairing: ["cebola", "pao-fermentacao", "cerveja-artesanal"],
  },
  {
    id: "tilapia",
    name: "Filé de tilápia",
    brand: "Piscicultura Água Clara",
    category: "proteinas",
    price: 44.9,
    unit: "kg",
    size: 1,
    tags: ["Sem espinhas"],
    description:
      "Filé limpo, sem espinha e sem pele, criado em tanque com água corrente. Pronto para grelhar.",
    storage: "Melhor no dia. Congelado, dura até 2 meses em embalagem bem fechada.",
    stock: 12,
    rating: 4.6,
    reviews: 92,
    pairing: ["alface-crespa", "kombucha-gengibre"],
  },
];

/** Busca um produto pelo identificador. */
export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/** Produtos de uma categoria. */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId);
}

/** Destaques da vitrine. */
export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

/** Maiores descontos do catálogo, usados na faixa de ofertas. */
export function getDeals(limit = 4): Product[] {
  return products
    .filter((product) => typeof product.compareAt === "number")
    .sort((a, b) => discountOf(b) - discountOf(a))
    .slice(0, limit);
}

/** Percentual de desconto de um produto (0 quando não há preço comparativo). */
export function discountOf(product: Product): number {
  if (!product.compareAt || product.compareAt <= product.price) return 0;
  const pct = ((product.compareAt - product.price) / product.compareAt) * 100;
  return Math.max(1, Math.round(pct));
}

export function formatUnit(product: Product): string {
  const size = product.size === 1 ? "" : `${product.size} `;
  return `${size}${product.unit === "un" && product.size === 1 ? "unidade" : product.unit}`.trim();
}
