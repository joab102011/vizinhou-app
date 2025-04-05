import { 
  FiHome,
  FiShoppingBag,
  FiTool,
  FiCoffee,
  FiBook,
  FiSmartphone,
  FiHeart,
  FiGrid
} from 'react-icons/fi';

interface CategoryIconProps {
  category: string;
  size?: number;
}

export function CategoryIcon({ category, size = 24 }: CategoryIconProps) {
  switch (category.toLowerCase()) {
    case 'moveis':
      return <FiHome size={size} />;
    case 'alimentacao':
      return <FiCoffee size={size} />;
    case 'servicos':
      return <FiTool size={size} />;
    case 'moda':
      return <FiShoppingBag size={size} />;
    case 'educacao':
      return <FiBook size={size} />;
    case 'eletronicos':
      return <FiSmartphone size={size} />;
    case 'saude':
      return <FiHeart size={size} />;
    default:
      return <FiGrid size={size} />;
  }
} 