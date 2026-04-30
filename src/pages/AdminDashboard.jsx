import { useState, useEffect, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Tag, ShoppingBag, Users, FileText, MapPin, Settings, AlertTriangle, Plus, Edit2, Trash2, X, Check, Eye, Star, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './AdminDashboard.css';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'categories', label: 'Categories', icon: Tag },
  { key: 'blogs', label: 'Blogs', icon: Edit2 },
  { key: 'orders', label: 'Orders', icon: ShoppingBag },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'feedback', label: 'Feedback', icon: MessageCircle },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const statusColor = { Shipped: '#dcf5e7', Processing: '#fff3cd', Pending: '#f8d7da', Delivered: '#e8f0fe' };
const statusText = { Shipped: '#1a7a3e', Processing: '#856404', Pending: '#842029', Delivered: '#1a56db' };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [platformSettings, setPlatformSettings] = useState({ lowStockThreshold: 20 });


  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', category: 'sto-green', price: '', stock: '', stockStatus: 'instock', image: '', shortDescription: '', isNew: false, isFeatured: false });

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', content: '', excerpt: '', status: 'Draft', image: '', category: 'Wellness', readTime: '5 min read', tags: '', color: '#1B3A2D' });

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', icon: '📦', image: '', color: '#1B3A2D' });
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [profileForm, setProfileForm] = useState({ username: '' });
  const [showConfirm, setShowConfirm] = useState(null);

  useEffect(() => {
    if (adminUser) {
      setProfileForm({ username: adminUser.username || '' });
    }
  }, [adminUser]);
  const showToast = (message, type = 'success') => {
    if (type === 'success') toast.success(message);
    else toast.error(message);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (userStr) setAdminUser(JSON.parse(userStr));

    const request = async (url, options = {}) => {
      const res = await fetch(url, {
        ...options,
        headers: { ...options.headers, 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return null;
      }
      return res;
    };

    const fetchData = async () => {
      try {
        const catRes = await request('http://localhost:5001/api/categories');
        if (catRes?.ok) {
          const json = await catRes.json();
          setCategories(json.data || json);
        }

        const blogRes = await request('http://localhost:5001/api/blogs');
        if (blogRes?.ok) setBlogs(await blogRes.json());

        const prodRes = await request('http://localhost:5001/api/products');
        if (prodRes?.ok) {
          const json = await prodRes.json();
          setProducts(json.data || json);
        }

        const ordersRes = await request('http://localhost:5001/api/orders/admin/all');
        if (ordersRes?.ok) {
          const json = await ordersRes.json();
          setOrders(json);
        }

        const usersRes = await request('http://localhost:5001/api/auth/admin/users');
        if (usersRes?.ok) {
          const json = await usersRes.json();
          // Filter to show only customers (role: 'user')
          setCustomers(json.filter(u => u.role === 'user'));
        } else if (usersRes) {
          console.error('Failed to fetch customers:', await usersRes.text());
        }

        const feedbackRes = await request('http://localhost:5001/api/feedback');
        if (feedbackRes?.ok) {
          const json = await feedbackRes.json();
          setFeedbacks(json);
        }

        const statsRes = await request('http://localhost:5001/api/admin/stats');
        if (statsRes?.ok) {
          const json = await statsRes.json();
          setDashboardStats(json);
        }

        const settingsRes = await request('http://localhost:5001/api/admin/settings');
        if (settingsRes?.ok) {
          const json = await settingsRes.json();
          setPlatformSettings(json);
        }


      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchData();
  }, [navigate]);

  const openAdd = () => { setEditProduct(null); setProductForm({ name: '', category: 'sto-green', price: '', stock: '', stockStatus: 'instock', image: '', shortDescription: '', isNew: false, isFeatured: false }); setShowProductForm(true); };
  const openEdit = (p) => { setEditProduct(p); setProductForm({ name: p.name, category: p.category, price: String(p.price), stock: String(p.stock), stockStatus: p.stockStatus, image: p.image || '', shortDescription: p.shortDescription, isNew: p.isNew, isFeatured: p.isFeatured }); setShowProductForm(true); };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setProducts(ps => ps.filter(p => (p.id !== id && p._id !== id)));
      showToast('Product deleted successfully');
    } else {
      showToast('Failed to delete product', 'error');
    }
    setShowConfirm(null);
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5001/api/settings/update-profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Profile updated successfully');
        setAdminUser(data.user);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
      } else {
        showToast(data.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      showToast('Connection error', 'error');
    }
  };

  const handleSaveProduct = async () => {
    const token = localStorage.getItem('adminToken');
    const method = editProduct ? 'PUT' : 'POST';
    const url = editProduct ? `http://localhost:5001/api/products/${editProduct._id || editProduct.id}` : 'http://localhost:5001/api/products';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        ...productForm,
        price: parseFloat(productForm.price) || 0,
        stock: parseInt(productForm.stock) || 0
      })
    });

    if (res.ok) {
      const responseData = await res.json();
      const savedProduct = responseData.data || responseData;
      if (editProduct) {
        setProducts(ps => ps.map(p => (p.id === editProduct.id || p._id === editProduct._id) ? savedProduct : p));
        showToast('Product updated');
      } else {
        setProducts(ps => [...ps, savedProduct]);
        showToast('Product created');
      }
      setShowProductForm(false);
    } else {
      showToast('Error saving product', 'error');
    }
  };

  const setPF = (k, v) => setProductForm(f => ({ ...f, [k]: v }));

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const openAddCategory = () => { setEditCategory(null); setCategoryForm({ name: '', description: '', icon: '📦', image: '', color: '#1B3A2D' }); setShowCategoryForm(true); };
  const openEditCategory = (c) => { setEditCategory(c); setCategoryForm({ name: c.name, description: c.description || '', icon: c.icon, image: c.image || '', color: c.color || '#1B3A2D' }); setShowCategoryForm(true); };

  const handleSaveCategory = async () => {
    const token = localStorage.getItem('adminToken');
    const method = editCategory ? 'PUT' : 'POST';
    const url = editCategory ? `http://localhost:5001/api/categories/${editCategory._id || editCategory.id}` : 'http://localhost:5001/api/categories';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(categoryForm)
    });
    if (res.ok) {
      const responseData = await res.json();
      const savedCat = responseData.data || responseData;
      if (editCategory) {
        setCategories(categories.map(c => (c.id === editCategory.id || c._id === editCategory._id) ? savedCat : c));
        showToast('Category updated');
      } else {
        setCategories([...categories, savedCat]);
        showToast('Category added');
      }
      setShowCategoryForm(false);
    } else {
      showToast('Error saving category', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setCategories(categories.filter(c => (c.id !== id && c._id !== id)));
      showToast('Category removed');
    } else {
      showToast('Failed to remove category', 'error');
    }
    setShowConfirm(null);
  };

  const openAddBlog = () => { setEditBlog(null); setBlogForm({ title: '', content: '', excerpt: '', status: 'Draft', image: '', category: 'Wellness', readTime: '5 min read', tags: '', color: '#1B3A2D' }); setShowBlogForm(true); };
  const openEditBlog = (b) => { setEditBlog(b); setBlogForm({ title: b.title, content: b.content, excerpt: b.excerpt || '', status: b.status, image: b.image || '', category: b.category || 'Wellness', readTime: b.readTime || '5 min read', tags: (b.tags || []).join(', '), color: b.color || '#1B3A2D' }); setShowBlogForm(true); };

  const handleSaveBlog = async () => {
    const token = localStorage.getItem('adminToken');
    const method = editBlog ? 'PUT' : 'POST';
    const url = editBlog ? `http://localhost:5001/api/blogs/${editBlog._id || editBlog.id}` : 'http://localhost:5001/api/blogs';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        ...blogForm,
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
      })
    });
    if (res.ok) {
      const savedBlog = await res.json();
      if (editBlog) {
        setBlogs(blogs.map(b => (b.id === editBlog.id || b._id === editBlog._id) ? savedBlog : b));
        showToast('Blog post updated');
      } else {
        setBlogs([...blogs, savedBlog]);
        showToast('Blog post created');
      }
      setShowBlogForm(false);
    } else {
      showToast('Error saving blog post', 'error');
    }
  };

  const handleDeleteBlog = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setBlogs(blogs.filter(b => b.id !== id));
      showToast('Blog post deleted');
    } else {
      showToast('Failed to delete blog', 'error');
    }
    setShowConfirm(null);
  };

  const handleUpdateOrderStatus = async (id, status) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(os => os.map(o => o._id === id ? updated : o));
      showToast(`Order status updated to ${status}`);
    } else {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteCustomer = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/auth/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setCustomers(cs => cs.filter(c => c._id !== id));
      showToast('Customer deleted successfully');
    } else {
      showToast('Failed to delete customer', 'error');
    }
    setShowConfirm(null);
  };

  const handleDeleteFeedback = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5001/api/feedback/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      setFeedbacks(fs => fs.filter(f => f._id !== id));
      showToast('Feedback removed');
    } else {
      showToast('Failed to remove feedback', 'error');
    }
    setShowConfirm(null);
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (type === 'product') setProductForm(prev => ({ ...prev, image: data.url }));
        if (type === 'category') setCategoryForm(prev => ({ ...prev, image: data.url }));
        if (type === 'blog') setBlogForm(prev => ({ ...prev, image: data.url }));
        showToast('Image uploaded successfully');
      } else {
        showToast('Upload failed', 'error');
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">STO</div>
        <nav className="admin-nav">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActive(key)}
              className={`admin-nav-item ${active === key ? 'active' : ''}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <div className="admin-avatar">{adminUser?.username?.charAt(0).toUpperCase() || 'A'}</div>
          <div>
            <div className="admin-user-name">{adminUser?.username || 'Admin User'}</div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#9a9a9a', fontSize: '12px', cursor: 'pointer', padding: 0 }}>Logout</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {active === 'dashboard' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Overview</h1><p className="admin-sub">Monitor your STO premium product performance.</p></div>
              <div className="admin-avatar-lg">{adminUser?.username?.charAt(0).toUpperCase() || 'A'}</div>
            </div>
            <div className="admin-stats">
              {[
                { 
                  label: 'Total Revenue', 
                  value: `€${(dashboardStats?.summary?.totalRevenue || orders.reduce((acc, o) => acc + o.totalAmount, 0)).toFixed(2)}`, 
                  badge: `+${dashboardStats?.summary?.orderCount || orders.length}`, 
                  badgeColor: '#dcf5e7', 
                  badgeText: '#1a7a3e' 
                },
                {
                  label: 'Inventory Health',
                  value: dashboardStats ? `${dashboardStats.summary.inventoryHealth.instock}/${dashboardStats.summary.inventoryHealth.total}` : `${products.filter(p => p.stockStatus === 'instock').length}/${products.length}`,
                  badge: (dashboardStats?.summary?.inventoryHealth?.alerts || products.filter(p => p.stockStatus !== 'instock').length) + ' Alerts',
                  badgeColor: (dashboardStats?.summary?.inventoryHealth?.alerts || products.filter(p => p.stockStatus !== 'instock').length) > 0 ? '#f8d7da' : '#dcf5e7',
                  badgeText: (dashboardStats?.summary?.inventoryHealth?.alerts || products.filter(p => p.stockStatus !== 'instock').length) > 0 ? '#842029' : '#1a7a3e'
                },
                { 
                  label: 'Total Customers', 
                  value: dashboardStats ? dashboardStats.summary.totalCustomers : customers.filter(c => c.role === 'user').length, 
                  badge: 'Active', 
                  badgeColor: '#e8f0fe', 
                  badgeText: '#1a56db' 
                },

              ].map(s => (
                <div key={s.label} className="admin-stat-card">
                  <div className="admin-stat-badge" style={{ background: s.badgeColor, color: s.badgeText }}>{s.badge}</div>
                  <div className="admin-stat-label">{s.label}</div>
                  <div className="admin-stat-value">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="admin-grid-2">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">Recent Activity</h2>
                  <button className="admin-link">View All</button>
                </div>
                <div style={{ padding: '20px' }}>
                  {orders.length > 0 ? (
                    orders.slice(0, 5).map(o => (
                      <div key={o._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f3f0ea' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#F3F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 600 }}>#{o._id.substring(0,2).toUpperCase()}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{o.user?.username || 'Guest'}</div>
                          <div style={{ fontSize: '11px', color: '#9a9a9a' }}>{new Date(o.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>€{o.totalAmount.toFixed(2)}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#9a9a9a', fontSize: '12px' }}>No recent orders.</div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="admin-card admin-alert-card">
                  <div className="admin-alert-header"><AlertTriangle size={15} style={{ color: '#856404' }} /> Low Stock Alerts</div>
                  {(dashboardStats?.lowStockItems || products.filter(p => p.stockStatus !== 'instock')).length > 0 ? (
                    (dashboardStats?.lowStockItems || products.filter(p => p.stockStatus !== 'instock')).slice(0, 5).map(p => (
                      <div key={p.id || p._id} className="admin-alert-item">
                        <img src={p.image} alt="" className="admin-alert-img" onError={e => e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=80'} />

                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: '#842029', fontWeight: 600, marginTop: '2px' }}>{(p.stockStatus || 'status').toUpperCase()}: {p.stock} units</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#9a9a9a', fontSize: '12px' }}>All items are well stocked.</div>
                  )}
                  {products.filter(p => p.stockStatus !== 'instock').length > 0 && (
                    <button className="btn btn-primary" onClick={() => setActive('products')} style={{ width: '100%', justifyContent: 'center', fontSize: '11px', padding: '10px' }}>MANAGE INVENTORY</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {active === 'products' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Products</h1><p className="admin-sub">Manage your product catalogue.</p></div>
              <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Product</button>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th style={{ textAlign: 'center' }}>Actions</th></tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id || p._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', background: '#F3F0EA' }}
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=80&q=70'; }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F2F24' }}>{p.name}</div>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                              {p.isFeatured && <span style={{ fontSize: '9px', padding: '1px 5px', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontWeight: 600 }}>FEATURED</span>}
                              {p.isNew && <span style={{ fontSize: '9px', padding: '1px 5px', background: '#dcf5e7', color: '#166534', borderRadius: '4px', fontWeight: 600 }}>NEW</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12px', color: '#6b6b6b', textTransform: 'capitalize' }}>{typeof p.category === 'object' ? p.category.name : p.category}</td>
                      <td style={{ fontSize: '13px', fontWeight: 500 }}>€{(p.price || 0).toFixed(2)}</td>
                      <td style={{ fontSize: '13px' }}>{p.stock || 0}</td>
                      <td><span className="admin-status" style={{ background: p.stockStatus === 'instock' ? '#dcf5e7' : p.stockStatus === 'lowstock' ? '#fff3cd' : '#f8d7da', color: p.stockStatus === 'instock' ? '#1a7a3e' : p.stockStatus === 'lowstock' ? '#856404' : '#842029' }}>{p.stockStatus || 'Out of Stock'}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button onClick={() => openEdit(p)} style={{ padding: '6px', border: '1px solid #e0ddd6', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}><Edit2 size={13} /></button>
                          <button onClick={() => setShowConfirm({ id: p.id || p._id, type: 'product', name: p.name })} style={{ padding: '6px', border: '1px solid #f8d7da', borderRadius: '6px', background: '#fff8f8', cursor: 'pointer' }}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'categories' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Categories</h1><p className="admin-sub">What We Offer — Two pillars of pure living.</p></div>
              <button className="btn btn-primary" onClick={openAddCategory}><Plus size={15} /> Add Category</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {categories.map(c => (
                <div key={c.id || c._id} style={{
                  background: '#fff', borderRadius: '16px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0ede7',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={c.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80'}
                      alt={c.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80'}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${c.color || '#1B3A2D'}cc 0%, transparent 60%)` }} />
                    <div style={{ position: 'absolute', bottom: '16px', left: '20px', color: '#fff' }}>
                      <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{c.icon}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 500 }}>{c.name}</div>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontSize: '13px', color: '#6b6b6b', lineHeight: 1.6, marginBottom: '16px', minHeight: '40px' }}>{c.description || 'No description'}</p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditCategory(c)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px' }}><Edit2 size={13} /> Edit</button>
                      <button onClick={() => setShowConfirm({ id: c._id || c.id, type: 'category', name: c.name })} style={{ padding: '8px 16px', fontSize: '12px', border: '1px solid #f8d7da', borderRadius: '6px', background: '#fff8f8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#842029' }}><Trash2 size={13} /> Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'blogs' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Blogs</h1><p className="admin-sub">Manage your blog posts.</p></div>
              <button className="btn btn-primary" onClick={openAddBlog}><Plus size={15} /> Add Blog</button>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead><tr><th>Title</th><th>Category</th><th>Status</th><th style={{ textAlign: 'center' }}>Actions</th></tr></thead>
                <tbody>
                  {blogs.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 500, color: '#0F2F24', fontSize: '13px' }}>{b.title}</td>
                      <td style={{ fontSize: '12px', color: '#6b6b6b' }}>{b.category || 'Wellness'}</td>
                      <td><span className="admin-status" style={{ background: b.status === 'Published' ? '#dcf5e7' : '#fff3cd', color: b.status === 'Published' ? '#1a7a3e' : '#856404' }}>{b.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button onClick={() => openEditBlog(b)} style={{ padding: '6px', border: '1px solid #e0ddd6', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}><Edit2 size={13} /></button>
                          <button onClick={() => setShowConfirm({ id: b.id, type: 'blog', name: b.title })} style={{ padding: '6px', border: '1px solid #f8d7da', borderRadius: '6px', background: '#fff8f8', cursor: 'pointer' }}><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'orders' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Orders</h1><p className="admin-sub">Manage customer purchases and tracking.</p></div>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Date</th><th>Status</th><th style={{ textAlign: 'center' }}>Actions</th></tr></thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map(o => (
                      <tr key={o._id}>
                        <td style={{ fontSize: '13px', fontWeight: 600 }}>#{o._id.substring(0, 8).toUpperCase()}</td>
                        <td style={{ fontSize: '13px' }}>{o.user?.username || 'Guest'}</td>
                        <td style={{ fontSize: '13px', fontWeight: 500 }}>€{o.totalAmount.toFixed(2)}</td>
                        <td style={{ fontSize: '12px', color: '#6b6b6b' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className="admin-status" style={{ 
                            background: o.status === 'delivered' ? '#dcf5e7' : o.status === 'shipped' ? '#e8f0fe' : o.status === 'processing' ? '#fff3cd' : '#f8d7da',
                            color: o.status === 'delivered' ? '#1a7a3e' : o.status === 'shipped' ? '#1a56db' : o.status === 'processing' ? '#856404' : '#842029'
                          }}>
                            {o.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button 
                              onClick={() => setSelectedOrder(o)} 
                              style={{ padding: '6px', border: '1px solid #e0ddd6', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
                              title="View Details"
                            >
                              <Eye size={13} />
                            </button>
                            <select 
                              className="form-select" 
                              style={{ padding: '4px 8px', fontSize: '11px', width: 'auto', height: 'auto' }}
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#9a9a9a', fontSize: '13px' }}>
                        No orders found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {active === 'customers' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Customers</h1><p className="admin-sub">View and manage your registered user base.</p></div>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th style={{ textAlign: 'center' }}>Actions</th></tr></thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map(c => (
                      <tr key={c._id}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#F3F0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600 }}>
                            {c.username?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 500 }}>{c.username || 'N/A'}</span>
                        </td>
                        <td style={{ fontSize: '13px' }}>{c.email || 'N/A'}</td>
                        <td style={{ fontSize: '12px', color: '#9a9a9a' }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Unknown'}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button 
                              onClick={() => setShowConfirm({ id: c._id, type: 'customer', name: c.username })} 
                              style={{ padding: '6px', border: '1px solid #f8d7da', borderRadius: '6px', background: '#fff8f8', cursor: 'pointer', color: '#842029' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#9a9a9a', fontSize: '13px' }}>
                        No customers found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {active === 'feedback' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div><h1 className="admin-title">Customer Feedback</h1><p className="admin-sub">What your customers are saying about STO.</p></div>
            </div>
            <div className="admin-card">
              <table className="admin-table">
                <thead><tr><th>Customer</th><th>Rating</th><th>Category</th><th>Message</th><th>Date</th><th style={{ textAlign: 'center' }}>Actions</th></tr></thead>
                <tbody>
                  {feedbacks.length > 0 ? (
                    feedbacks.map(f => (
                      <Fragment key={f._id}>
                        <tr 
                          onClick={() => setExpandedFeedback(expandedFeedback === f._id ? null : f._id)}
                          style={{ cursor: 'pointer', background: expandedFeedback === f._id ? '#fafaf8' : 'transparent' }}
                        >
                          <td style={{ minWidth: '150px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {expandedFeedback === f._id ? <ChevronUp size={14} color="#9a9a9a" /> : <ChevronDown size={14} color="#9a9a9a" />}
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 600 }}>{f.name}</div>
                                <div style={{ fontSize: '11px', color: '#9a9a9a' }}>{f.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {[1,2,3,4,5].map(n => (
                                <Star key={n} size={10} fill={n <= f.rating ? '#D4A843' : 'none'} stroke={n <= f.rating ? '#D4A843' : '#ccc'} />
                              ))}
                            </div>
                          </td>
                          <td><span style={{ fontSize: '11px', padding: '2px 6px', background: '#f3f0ea', borderRadius: '4px', color: '#0F2F24' }}>{f.category}</span></td>
                          <td style={{ maxWidth: '200px' }}>
                            <div style={{ fontSize: '12px', color: '#6b6b6b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.message}</div>
                          </td>
                          <td style={{ fontSize: '11px', color: '#9a9a9a' }}>{new Date(f.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
                              <button 
                                onClick={() => setShowConfirm({ id: f._id, type: 'feedback', name: `Feedback from ${f.name}` })} 
                                style={{ padding: '6px', border: '1px solid #f8d7da', borderRadius: '6px', background: '#fff8f8', cursor: 'pointer', color: '#842029' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <AnimatePresence>
                          {expandedFeedback === f._id && (
                            <tr>
                              <td colSpan="6" style={{ padding: 0, borderBottom: '1px solid #f3f0ea' }}>
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }} 
                                  animate={{ height: 'auto', opacity: 1 }} 
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  style={{ overflow: 'hidden', background: '#fcfcfb' }}
                                >
                                  <div style={{ padding: '20px 40px', display: 'flex', gap: '40px' }}>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Full Message</div>
                                      <div style={{ fontSize: '14px', color: '#0F2F24', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{f.message}</div>
                                    </div>
                                    <div style={{ width: '200px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #f3f0ea' }}>
                                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '12px' }}>Details</div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div>
                                          <div style={{ fontSize: '10px', color: '#9a9a9a' }}>Rating</div>
                                          <div style={{ fontSize: '12px', fontWeight: 500 }}>{f.rating} / 5 Stars</div>
                                        </div>
                                        <div>
                                          <div style={{ fontSize: '10px', color: '#9a9a9a' }}>Category</div>
                                          <div style={{ fontSize: '12px', fontWeight: 500 }}>{f.category}</div>
                                        </div>
                                        <div>
                                          <div style={{ fontSize: '10px', color: '#9a9a9a' }}>Submitted</div>
                                          <div style={{ fontSize: '12px', fontWeight: 500 }}>{new Date(f.createdAt).toLocaleString()}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#9a9a9a', fontSize: '13px' }}>
                        No feedback received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {active === 'settings' && (
          <div className="admin-page">
            <div className="admin-page-header">
              <div>
                <h1 className="admin-title">Settings</h1>
                <p className="admin-sub">Customize your administrative experience and platform rules.</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
              
              {/* Account Profile Card */}
              <div className="admin-card" style={{ padding: '32px', border: '1px solid #f0ede7', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '10px', background: '#f3f0ea', borderRadius: '12px', color: '#0F2F24' }}>
                    <Users size={20} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24', margin: 0 }}>Account Profile</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Administrative Username</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                        placeholder="Enter username"
                        style={{ paddingLeft: '12px', fontWeight: 500 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '11px', color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Status</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f9f9f7', borderRadius: '10px', border: '1px solid #f3f0ea' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7BAA8D' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2F24' }}>Active Admin</span>
                      <span style={{ fontSize: '11px', color: '#9a9a9a', marginLeft: 'auto' }}>Role: {adminUser?.role}</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary" 
                    onClick={handleUpdateProfile}
                    style={{ width: '100%', justifyContent: 'center', height: '45px', borderRadius: '10px' }}
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>

              {/* Security Card */}
              <div className="admin-card" style={{ padding: '32px', border: '1px solid #f0ede7', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '10px', background: '#f3f0ea', borderRadius: '12px', color: '#0F2F24' }}>
                    <AlertTriangle size={20} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24', margin: 0 }}>Security</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label className="form-label">Current Password</label>
                    <input type="password" id="currentPassword" placeholder="••••••••" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">New Password</label>
                    <input type="password" id="newPassword" placeholder="••••••••" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="••••••••" className="form-input" />
                  </div>
                  <button 
                    className="btn btn-outline" 
                    style={{ marginTop: '8px', width: '100%', justifyContent: 'center', height: '45px', borderRadius: '10px' }}
                    onClick={async () => {
                      const cp = document.getElementById('currentPassword').value;
                      const np = document.getElementById('newPassword').value;
                      const cnp = document.getElementById('confirmPassword').value;
                      if (!cp || !np || !cnp) return showToast('All fields required', 'error');
                      if (np !== cnp) return showToast('Passwords do not match', 'error');
                      
                      const token = localStorage.getItem('adminToken');
                      try {
                        const res = await fetch('http://localhost:5001/api/settings/change-password', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                          body: JSON.stringify({ currentPassword: cp, newPassword: np })
                        });
                        if (res.ok) {
                          showToast('Password updated successfully');
                          ['currentPassword', 'newPassword', 'confirmPassword'].forEach(id => document.getElementById(id).value = '');
                        } else {
                          const d = await res.json();
                          showToast(d.message || 'Error updating password', 'error');
                        }
                      } catch (e) { showToast('Connection error', 'error'); }
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Platform Settings */}
              <div className="admin-card" style={{ padding: '32px', gridColumn: '1 / -1', border: '1px solid #f0ede7', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ padding: '10px', background: '#f3f0ea', borderRadius: '12px', color: '#0F2F24' }}>
                    <Package size={20} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24', margin: 0 }}>Inventory Preferences</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <label className="form-label">Low Stock Threshold</label>
                    <p style={{ fontSize: '12px', color: '#9a9a9a', marginBottom: '12px' }}>Define the quantity at which a product will be flagged as "Low Stock" in the dashboard.</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <input 
                        type="number" 
                        className="form-input" 
                        style={{ maxWidth: '120px', fontSize: '1.2rem', fontWeight: 600, textAlign: 'center' }}
                        value={platformSettings.lowStockThreshold}
                        onChange={(e) => setPlatformSettings({ ...platformSettings, lowStockThreshold: parseInt(e.target.value) || 0 })}
                      />
                      <div style={{ flex: 1, padding: '12px', background: '#fafaf8', borderRadius: '10px', fontSize: '12px', color: '#6b6b6b' }}>
                        Current threshold: <b>{platformSettings.lowStockThreshold} units</b>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ height: '45px', padding: '0 40px' }}
                    onClick={async () => {
                      const token = localStorage.getItem('adminToken');
                      try {
                        const res = await fetch('http://localhost:5001/api/admin/settings', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                          body: JSON.stringify(platformSettings)
                        });
                        if (res.ok) {
                          showToast('Inventory settings saved');
                          const statsRes = await fetch('http://localhost:5001/api/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } });
                          if (statsRes.ok) setDashboardStats(await statsRes.json());
                        }
                      } catch (e) { showToast('Error saving settings', 'error'); }
                    }}
                  >
                    Apply Changes
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      <AnimatePresence>
        {showProductForm && (
          <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProductForm(false)}>
            <motion.div className="admin-modal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24' }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowProductForm(false)} className="admin-modal-close"><X size={20} /></button>
              </div>
              <div className="admin-modal-body">
                <div className="form-group"><label className="form-label">Product Name</label><input value={productForm.name} onChange={e => setPF('name', e.target.value)} className="form-input" placeholder="Product name" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select value={productForm.category} onChange={e => setPF('category', e.target.value)} className="form-select">
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Price (€)</label><input type="number" value={productForm.price} onChange={e => setPF('price', e.target.value)} className="form-input" placeholder="0.00" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Stock Qty</label><input type="number" value={productForm.stock} onChange={e => setPF('stock', e.target.value)} className="form-input" placeholder="0" /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Product Image</label>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', border: '1.5px dashed #e0ddd6', borderRadius: '12px', background: '#fafaf8' }}>
                    {productForm.image ? (
                      <div style={{ position: 'relative' }}>
                        <img src={productForm.image} alt="Preview" style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <button onClick={() => setPF('image', '')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fff', border: '1px solid #e0ddd6', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: '#842029', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><X size={14} /></button>
                      </div>
                    ) : (
                      <div style={{ color: '#9a9a9a', fontSize: '12px', textAlign: 'center' }}>
                        <ShoppingBag size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>No image uploaded yet</p>
                      </div>
                    )}
                    <label className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '12px', cursor: 'pointer' }}>
                      {productForm.image ? 'Change Image' : 'Upload Image'}
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'product')} />
                    </label>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px', background: '#fafaf8', borderRadius: '12px', border: '1px solid #e0ddd6', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="isNew"
                      checked={productForm.isNew} 
                      onChange={e => setPF('isNew', e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#7BAA8D', cursor: 'pointer' }}
                    />
                    <label htmlFor="isNew" style={{ fontSize: '13px', fontWeight: 500, color: '#0F2F24', cursor: 'pointer' }}>New Arrival</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      checked={productForm.isFeatured} 
                      onChange={e => setPF('isFeatured', e.target.checked)}
                      style={{ width: '18px', height: '18px', accentColor: '#D4A843', cursor: 'pointer' }}
                    />
                    <label htmlFor="isFeatured" style={{ fontSize: '13px', fontWeight: 500, color: '#0F2F24', cursor: 'pointer' }}>Featured Product</label>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Short Description</label><textarea value={productForm.shortDescription} onChange={e => setPF('shortDescription', e.target.value)} className="form-input" style={{ resize: 'vertical', minHeight: '60px' }} placeholder="Brief overview..." /></div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setShowProductForm(false)} className="btn btn-outline">Cancel</button>
                <button onClick={handleSaveProduct} className="btn btn-primary"><Check size={15} /> {editProduct ? 'Update' : 'Save'} Product</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCategoryForm && (
          <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCategoryForm(false)}>
            <motion.div className="admin-modal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24' }}>{editCategory ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={() => setShowCategoryForm(false)} className="admin-modal-close"><X size={20} /></button>
              </div>
              <div className="admin-modal-body">
                <div className="form-group"><label className="form-label">Category Name</label><input value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} className="form-input" placeholder="e.g. Saana Tuotanto Green" /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} className="form-input" style={{ resize: 'vertical', minHeight: '60px' }} placeholder="e.g. Living nutrition from Vantaa's vertical farms." /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Icon (Emoji)</label><input value={categoryForm.icon} onChange={e => setCategoryForm({ ...categoryForm, icon: e.target.value })} className="form-input" placeholder="📦" /></div>
                  <div className="form-group"><label className="form-label">Brand Color</label><input type="color" value={categoryForm.color} onChange={e => setCategoryForm({ ...categoryForm, color: e.target.value })} style={{ width: '100%', height: '40px', border: '1px solid #eae7e1', borderRadius: '6px', cursor: 'pointer', padding: '4px' }} /></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Category Image</label>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', border: '1.5px dashed #e0ddd6', borderRadius: '12px', background: '#fafaf8' }}>
                    {categoryForm.image ? (
                      <div style={{ position: 'relative' }}>
                        <img src={categoryForm.image} alt="Preview" style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <button onClick={() => setCategoryForm(prev => ({ ...prev, image: '' }))} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fff', border: '1px solid #e0ddd6', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: '#842029', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><X size={14} /></button>
                      </div>
                    ) : (
                      <div style={{ color: '#9a9a9a', fontSize: '12px', textAlign: 'center' }}>
                        <Tag size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>No image uploaded yet</p>
                      </div>
                    )}
                    <label className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '12px', cursor: 'pointer' }}>
                      {categoryForm.image ? 'Change Image' : 'Upload Image'}
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'category')} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setShowCategoryForm(false)} className="btn btn-outline">Cancel</button>
                <button onClick={handleSaveCategory} className="btn btn-primary"><Check size={15} /> {editCategory ? 'Update' : 'Save'} Category</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBlogForm && (
          <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBlogForm(false)}>
            <motion.div className="admin-modal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24' }}>{editBlog ? 'Edit Blog Post' : 'Add Blog Post'}</h2>
                <button onClick={() => setShowBlogForm(false)} className="admin-modal-close"><X size={20} /></button>
              </div>
              <div className="admin-modal-body">
                <div className="form-group"><label className="form-label">Blog Title</label><input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} className="form-input" placeholder="Blog title" /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select 
                      value={blogForm.category} 
                      onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} 
                      className="form-select"
                    >
                      <option value="Nutrition Science">Nutrition Science</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Behind the Scenes">Behind the Scenes</option>
                      <option value="Beginner's Guide">Beginner's Guide</option>
                      <option value="Health">Health</option>
                      <option value="Sustainability">Sustainability</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Read Time</label><input value={blogForm.readTime} onChange={e => setBlogForm({ ...blogForm, readTime: e.target.value })} className="form-input" placeholder="5 min read" /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group"><label className="form-label">Tags (comma separated)</label><input value={blogForm.tags} onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })} className="form-input" placeholder="Science, Health" /></div>
                  <div className="form-group"><label className="form-label">Theme Color</label><input type="color" value={blogForm.color} onChange={e => setBlogForm({ ...blogForm, color: e.target.value })} style={{ width: '100%', height: '40px', border: '1px solid #eae7e1', borderRadius: '6px', cursor: 'pointer', padding: '4px' }} /></div>
                </div>
                <div className="form-group"><label className="form-label">Excerpt</label><textarea value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} className="form-input" style={{ resize: 'vertical', minHeight: '60px' }} placeholder="Short summary for the blog feed..." /></div>
                <div className="form-group"><label className="form-label">Content</label><textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="form-input" style={{ resize: 'vertical', minHeight: '100px' }} placeholder="Blog content..." /></div>
                <div className="form-group">
                  <label className="form-label">Featured Image</label>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', border: '1.5px dashed #e0ddd6', borderRadius: '12px', background: '#fafaf8' }}>
                    {blogForm.image ? (
                      <div style={{ position: 'relative' }}>
                        <img src={blogForm.image} alt="Preview" style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <button onClick={() => setBlogForm(prev => ({ ...prev, image: '' }))} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fff', border: '1px solid #e0ddd6', borderRadius: '50%', padding: '4px', cursor: 'pointer', color: '#842029', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}><X size={14} /></button>
                      </div>
                    ) : (
                      <div style={{ color: '#9a9a9a', fontSize: '12px', textAlign: 'center' }}>
                        <Edit2 size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                        <p>No image uploaded yet</p>
                      </div>
                    )}
                    <label className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '12px', cursor: 'pointer' }}>
                      {blogForm.image ? 'Change Image' : 'Upload Image'}
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'blog')} />
                    </label>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Status</label><select value={blogForm.status} onChange={e => setBlogForm({ ...blogForm, status: e.target.value })} className="form-select"><option value="Draft">Draft</option><option value="Published">Published</option></select></div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setShowBlogForm(false)} className="btn btn-outline">Cancel</button>
                <button onClick={handleSaveBlog} className="btn btn-primary"><Check size={15} /> {editBlog ? 'Update' : 'Save'} Blog Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowConfirm(null)} style={{ zIndex: 11000 }}>
            <motion.div className="admin-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '32px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#842029' }}>
                <Trash2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Confirm Delete</h3>
              <p style={{ fontSize: '14px', color: '#6b6b6b', marginBottom: '24px' }}>Are you sure you want to delete <b>{showConfirm.name}</b>? This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setShowConfirm(null)} className="btn btn-outline">Cancel</button>
                <button onClick={() => {
                  if (showConfirm.type === 'product') handleDeleteProduct(showConfirm.id);
                  if (showConfirm.type === 'category') handleDeleteCategory(showConfirm.id);
                  if (showConfirm.type === 'blog') handleDeleteBlog(showConfirm.id);
                  if (showConfirm.type === 'customer') handleDeleteCustomer(showConfirm.id);
                  if (showConfirm.type === 'feedback') handleDeleteFeedback(showConfirm.id);
                }} className="btn" style={{ background: '#842029', color: '#fff', padding: '10px 24px' }}>Delete Now</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)}>
            <motion.div className="admin-modal" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
              <div className="admin-modal-header">
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: '#0F2F24' }}>Order Details</h2>
                  <p style={{ fontSize: '12px', color: '#9a9a9a' }}>#{selectedOrder._id.toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="admin-modal-close"><X size={20} /></button>
              </div>
              <div className="admin-modal-body" style={{ gap: '24px' }}>
                {/* Order Items */}
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F2F24', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={14} /> Items Ordered
                  </h3>
                  <div style={{ background: '#fafaf8', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f3f0ea' }}>
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: idx === selectedOrder.items.length - 1 ? 'none' : '1px solid #f3f0ea' }}>
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} onError={e => e.target.src = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=80'} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#9a9a9a' }}>Qty: {item.quantity} × €{item.price.toFixed(2)}</div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>€{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* Shipping Address */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F2F24', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} /> Shipping Information
                    </h3>
                    <div style={{ fontSize: '13px', color: '#6b6b6b', lineHeight: 1.6, padding: '16px', background: '#fafaf8', borderRadius: '12px', border: '1px solid #f3f0ea' }}>
                      <div style={{ fontWeight: 600, color: '#0F2F24' }}>{selectedOrder.shippingAddress.fullName}</div>
                      <div>{selectedOrder.shippingAddress.address}</div>
                      <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</div>
                      <div>{selectedOrder.shippingAddress.country}</div>
                      <div style={{ marginTop: '8px', color: '#7BAA8D', fontWeight: 500 }}>📱 {selectedOrder.shippingAddress.phone}</div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0F2F24', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} /> Payment & Status
                    </h3>
                    <div style={{ padding: '16px', background: '#fafaf8', borderRadius: '12px', border: '1px solid #f3f0ea' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#9a9a9a' }}>Payment Method:</span>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>Razorpay</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#9a9a9a' }}>Order Status:</span>
                        <span className="admin-status" style={{ 
                          background: selectedOrder.status === 'delivered' ? '#dcf5e7' : '#fff3cd',
                          color: selectedOrder.status === 'delivered' ? '#1a7a3e' : '#856404',
                          fontSize: '9px'
                        }}>{selectedOrder.status.toUpperCase()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f3f0ea', marginTop: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Total Paid:</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F2F24' }}>€{selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button onClick={() => setSelectedOrder(null)} className="btn btn-primary">Close Details</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
