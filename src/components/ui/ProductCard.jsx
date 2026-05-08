import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './ProductCard.css';

const stockLabels = {
  instock: { label: 'In Stock', cls: 'badge-instock' },
  lowstock: { label: 'Low Stock', cls: 'badge-lowstock' },
  outofstock: { label: 'Out of Stock', cls: 'badge-outofstock' },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();
  const [added, setAdded] = useState(false);
  const p = t.products;

  const stock = stockLabels[product.stockStatus] || stockLabels.instock;

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.stockStatus === 'outofstock') return;
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/product/${product._id || product.id}`} className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80'; }}
        />
        <div className="product-card__badges">
          {product.isNew && <span className="badge badge-new">{p.newBadge || 'New'}</span>}
          {product.isFeatured && <span className="badge badge-featured">{p.featuredBadge || 'Featured'}</span>}
        </div>
        <div className="product-card__overlay">
          <span className="product-card__view">{p.viewDetails || 'View Details'}</span>
        </div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__category">
            {product.category === 'microgreens' ? p.filterAll === 'All' ? 'Microgreens' : p.filterAll :
             product.category === 'water' ? p.premiumWater || 'Premium Water' : p.luxuryCandles || 'Luxury Candles'}
          </span>
          <span className={`badge ${stock.cls}`}>{p[product.stockStatus === 'instock' ? 'inStock' : product.stockStatus === 'lowstock' ? 'lowStock' : 'outOfStock'] || stock.label}</span>
        </div>

        <Link to={`/product/${product._id || product.id}`}>
          <h3 className="product-card__name">
            {product.translations?.[language]?.name || product.name}
          </h3>
        </Link>
        <p className="product-card__desc">
          {product.translations?.[language]?.shortDescription || product.shortDescription}
        </p>

        <div className="product-card__footer">
          <div className="product-card__price-block">
            <span className="product-card__price">€{(product.price || 0).toFixed(2)}</span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="product-card__qty">{product.stock} {p.left || 'left'}</span>
            )}
          </div>
          <motion.button
            className={`product-card__add ${added ? 'added' : ''} ${product.stockStatus === 'outofstock' ? 'disabled' : ''}`}
            onClick={handleAdd}
            whileTap={{ scale: 0.93 }}
            disabled={product.stockStatus === 'outofstock'}
            aria-label={p.addToCart}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
            <span>{added ? p.added || 'Added!' : (product.stockStatus === 'outofstock' ? p.outOfStock : p.addToCart)}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
