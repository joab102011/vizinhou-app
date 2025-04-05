import { CategoryCard } from './CategoryCard';
import { 
  FiHome,
  FiCoffee,
  FiTool,
  FiShoppingBag,
  FiBook,
  FiSmartphone,
  FiHeart
} from 'react-icons/fi';

const categories = [
  {
    title: 'Móveis e Decoração',
    icon: FiHome,
    href: '/categoria/moveis',
    description: 'Móveis, decoração e itens para sua casa'
  },
  {
    title: 'Alimentação',
    icon: FiCoffee,
    href: '/categoria/alimentacao',
    description: 'Comidas, bebidas e produtos alimentícios'
  },
  {
    title: 'Serviços',
    icon: FiTool,
    href: '/categoria/servicos',
    description: 'Serviços profissionais e assistência técnica'
  },
  {
    title: 'Moda',
    icon: FiShoppingBag,
    href: '/categoria/moda',
    description: 'Roupas, calçados e acessórios'
  },
  {
    title: 'Educação',
    icon: FiBook,
    href: '/categoria/educacao',
    description: 'Livros, cursos e material escolar'
  },
  {
    title: 'Eletrônicos',
    icon: FiSmartphone,
    href: '/categoria/eletronicos',
    description: 'Celulares, computadores e eletrônicos'
  },
  {
    title: 'Saúde e Bem-estar',
    icon: FiHeart,
    href: '/categoria/saude',
    description: 'Produtos de saúde e cuidados pessoais'
  }
];

export const CategoriesList = () => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Explore por Categorias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              href={category.href}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 