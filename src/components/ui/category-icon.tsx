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
  hortifruti: IconCategoryLeaf,
  padaria: IconCategoryBread,
  laticinios: IconCategoryCheese,
  mercearia: IconCategoryJar,
  bebidas: IconCategoryBottle,
  proteinas: IconCategoryMeat,
};

/** Ícone de linha do corredor, escolhido pelo id da categoria. */
export function CategoryIcon({ id, className }: { id: CategoryId; className?: string }) {
  const Icon = map[id];
  return <Icon className={className} />;
}
