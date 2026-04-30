import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../ui/ProductCard';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const p = t.products;
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="section" style={{ background: '#FAFAF8' }}>
      <div className="container">
        <motion.div
          style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'48px', flexWrap:'wrap', gap:'16px' }}
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <div>
            <div className="section-label">{p.label}</div>
            <h2 className="section-title" style={{ marginBottom:0 }}>{p.title}</h2>
          </div>
          <Link to="/shop" className="btn btn-outline" style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            {p.viewAll} <ArrowRight size={15} />
          </Link>
        </motion.div>
        <div className="grid-4">
          {featured.map((prod, i) => (
            <motion.div
              key={prod.id}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay: i*0.1 }}
            >
              <ProductCard product={prod} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
