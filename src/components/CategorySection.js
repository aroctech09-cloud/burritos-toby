import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../mock/products';

const CategorySection = ({ category, searchQuery }) => {
  const categoryProducts = products.filter(p => 
    p.category === category && 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (categoryProducts.length === 0) return null;

  const categoryNames = {
    clásicos: 'Burritos Clásicos',
    picantes: 'Burritos Picantes',
    veggies: 'Burritos Veggies'
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="mb-16"
    >
      <motion.div
        className="flex items-center gap-3 mb-8"
        whileHover={{ scale: 1.02 }}
      >
        <Menu className="w-6 h-6 text-[#3B1C08]" />
        <h2 className="text-3xl font-bold text-[#3B1C08]">
          {categoryNames[category] || category}
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};

export default CategorySection;