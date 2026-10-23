import type { CategoryId } from "@/types/domain";
import {
  IconCategoryBottle,
  IconCategoryBread,
  IconCategoryCheese,
  IconCategoryJar,
  IconCategoryLeaf,
  IconCategoryMeat,
} from "@/components/ui/icons";

type IconProps = {
  className?: string;
};

const map: Record<CategoryId, (props: IconProps) => React.ReactElement> = {
  acougue: IconCategoryMeat,
  "frios-laticinios": IconCategoryCheese,
  bebidas: IconCategoryBottle,
  hortifruti: IconCategoryLeaf,
  mercearia: IconCategoryJar,
  limpeza: IconCategoryJar,
  higiene: IconCategoryBottle,
  padaria: IconCategoryBread,
  saudaveis: IconCategoryLeaf,
  "pet-shop": IconCategoryMeat,
  bazar: IconCategoryJar,
  congelados: IconCategoryCheese,
};

/** Ícone de linha do corredor, escolhido pelo id da categoria. */
export function CategoryIcon({ id, className }: { id: CategoryId; className?: string }) {
  const Icon = map[id];
  return <Icon className={className} />;
}
