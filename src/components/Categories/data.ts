import type { IconType } from 'react-icons/lib';
import { 
  FiHome, FiCoffee, FiScissors, 
  FiBook, FiTool, FiMessageCircle, FiPackage, FiHeart, FiShoppingBag, FiGrid 
} from 'react-icons/fi';
import { MdPets } from 'react-icons/md';
import { PiDog } from 'react-icons/pi';

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: 'casa-itens',
    name: 'Casa & Itens Usados',
    description: 'Móveis, eletrodomésticos e itens para casa em bom estado',
    icon: FiHome,
    subcategories: [
      {
        id: 'moveis',
        name: 'Móveis',
        description: 'Sofás, mesas, cadeiras e outros móveis'
      },
      {
        id: 'eletrodomesticos',
        name: 'Eletrodomésticos',
        description: 'Geladeiras, fogões, máquinas de lavar e outros'
      },
      {
        id: 'decoracao',
        name: 'Decoração',
        description: 'Quadros, tapetes, luminárias e itens decorativos'
      }
    ]
  },
  {
    id: 'comidas',
    name: 'Comidas & Lanches',
    description: 'Comidas caseiras, lanches, bolos e doces',
    icon: FiCoffee,
    subcategories: [
      {
        id: 'caseira',
        name: 'Comida Caseira',
        description: 'Marmitas, pratos prontos e refeições'
      },
      {
        id: 'lanches',
        name: 'Lanches',
        description: 'Salgados, sanduíches e lanches rápidos'
      },
      {
        id: 'doces',
        name: 'Doces & Bolos',
        description: 'Bolos, tortas, doces e sobremesas'
      }
    ]
  },
  {
    id: 'servicos',
    name: 'Serviços Locais',
    description: 'Serviços de manutenção, limpeza e outros',
    icon: FiTool,
    subcategories: [
      {
        id: 'manutencao',
        name: 'Manutenção',
        description: 'Reparos, consertos e instalações'
      },
      {
        id: 'limpeza',
        name: 'Limpeza',
        description: 'Serviços de limpeza e organização'
      },
      {
        id: 'outros-servicos',
        name: 'Outros Serviços',
        description: 'Diversos serviços para o condomínio'
      }
    ]
  },
  {
    id: 'infantil',
    name: 'Infantil & Bebê',
    description: 'Roupas, brinquedos e itens para crianças',
    icon: FiHeart,
    subcategories: [
      {
        id: 'roupas',
        name: 'Roupas',
        description: 'Roupas infantis e para bebês'
      },
      {
        id: 'brinquedos',
        name: 'Brinquedos',
        description: 'Brinquedos e jogos infantis'
      },
      {
        id: 'acessorios',
        name: 'Acessórios',
        description: 'Carrinhos, cadeirinhas e outros itens'
      }
    ]
  },
  {
    id: 'pets',
    name: 'Pets',
    description: 'Produtos e serviços para animais de estimação',
    icon: PiDog,
    subcategories: [
      {
        id: 'produtos',
        name: 'Produtos',
        description: 'Rações, brinquedos e acessórios'
      },
      {
        id: 'servicos-pet',
        name: 'Serviços',
        description: 'Banho, tosa e passeios'
      },
      {
        id: 'adocao',
        name: 'Adoção',
        description: 'Animais para adoção responsável'
      }
    ]
  },
  {
    id: 'livros',
    name: 'Livros & Material',
    description: 'Livros, material escolar e didático',
    icon: FiBook,
    subcategories: [
      {
        id: 'livros',
        name: 'Livros',
        description: 'Livros usados em bom estado'
      },
      {
        id: 'material-escolar',
        name: 'Material Escolar',
        description: 'Cadernos, mochilas e materiais'
      },
      {
        id: 'didatico',
        name: 'Material Didático',
        description: 'Apostilas e livros didáticos'
      }
    ]
  },
  {
    id: 'ferramentas',
    name: 'Ferramentas & Manutenção',
    description: 'Ferramentas e equipamentos para manutenção',
    icon: FiShoppingBag,
    subcategories: [
      {
        id: 'ferramentas',
        name: 'Ferramentas',
        description: 'Ferramentas manuais e elétricas'
      },
      {
        id: 'jardinagem',
        name: 'Jardinagem',
        description: 'Equipamentos e produtos para jardim'
      },
      {
        id: 'construcao',
        name: 'Construção',
        description: 'Materiais e equipamentos de construção'
      }
    ]
  },
  {
    id: 'diversos',
    name: 'Diversos',
    description: 'Outros itens e serviços variados',
    icon: FiGrid,
    subcategories: [
      {
        id: 'roupas-adulto',
        name: 'Roupas Adulto',
        description: 'Roupas e acessórios para adultos'
      },
      {
        id: 'eletronicos',
        name: 'Eletrônicos',
        description: 'Celulares, computadores e gadgets'
      },
      {
        id: 'outros',
        name: 'Outros',
        description: 'Itens diversos não categorizados'
      }
    ]
  }
]; 