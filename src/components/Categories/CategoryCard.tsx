import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface CategoryCardProps {
  title: string;
  icon: IconType;
  href: string;
  description: string;
}

export const CategoryCard = ({ title, icon: Icon, href, description }: CategoryCardProps) => {
  return (
    <Link href={href}>
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full">
            <Icon size={32} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
          <p className="text-sm text-gray-600 text-center">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}; 