import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useProducts, useAuth } from '../hooks';
import type { Product, AddProductFormData, SortField } from '../types';

export function ProductsPage() {
  const { products, isLoading, error, searchQuery, sortState, handleSort, addProduct, search } = useProducts();
  const { logout } = useAuth();
  
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState<AddProductFormData>({
    title: '',
    price: '',
    brand: '',
    sku: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AddProductFormData, string>>>({});

  // Helper function for sort icons (not a hook!)
  const getSortIcon = (field: SortField): string => {
    if (sortState.field !== field) return '⇅';
    return sortState.order === 'asc' ? '↑' : '↓';
  };

  // Handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  // Handle add product
  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof AddProductFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Наименование обязательно';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Цена обязательна';
    }
    if (!formData.brand.trim()) {
      newErrors.brand = 'Вендор обязателен';
    }
    if (!formData.sku.trim()) {
      newErrors.sku = 'Артикул обязателен';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title: formData.title,
      description: '',
      price: parseFloat(formData.price),
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: formData.brand,
      category: '',
      thumbnail: '',
      images: [],
    };

    addProduct(newProduct);
    setShowModal(false);
    setFormData({ title: '', price: '', brand: '', sku: '' });
    setFormErrors({});
  };

  return (
    <div className="products-page">
      <header className="header">
        <h1 className="header-title">Товары</h1>
        <div className="header-right">
          <button className="logout-button" onClick={logout}>
            Выйти
          </button>
        </div>
      </header>

      <main className="content">
        <div className="toolbar">
          <button className="add-button" onClick={() => setShowModal(true)}>
            + Добавить
          </button>
          
          <div className="search-container">
            <svg 
              className="search-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="table-container">
          {isLoading ? (
            <div className="skeleton-container">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton skeleton-row" />
              ))}
            </div>
          ) : error ? (
            <div className="empty-state">{error}</div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('title')}>
                    Наименование {getSortIcon('title')}
                  </th>
                  <th onClick={() => handleSort('brand')}>
                    Вендор {getSortIcon('brand')}
                  </th>
                  <th onClick={() => handleSort('id')}>
                    Артикул {getSortIcon('id')}
                  </th>
                  <th onClick={() => handleSort('rating')}>
                    Оценка {getSortIcon('rating')}
                  </th>
                  <th onClick={() => handleSort('price')}>
                    Цена {getSortIcon('price')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className='product-title'>{product.title}</td>
                    <td className='product-brand'>{product.brand}</td>
                    <td>{product.id.toString().padStart(6, '0')}</td>
                    <td className={product.rating < 3 ? 'rating-low' : 'rating-normal'}>
                      {product.rating.toFixed(1)}/5
                    </td>
                    <td>{product.price.toFixed(2)} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Добавить товар</h2>
            
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label className="form-label">Наименование</label>
                <input
                  type="text"
                  className={`form-input ${formErrors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Введите наименование"
                />
                {formErrors.title && (
                  <span className="error-message">{formErrors.title}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Цена</label>
                <input
                  type="number"
                  className={`form-input ${formErrors.price ? 'error' : ''}`}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Введите цену"
                  step="0.01"
                />
                {formErrors.price && (
                  <span className="error-message">{formErrors.price}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Вендор</label>
                <input
                  type="text"
                  className={`form-input ${formErrors.brand ? 'error' : ''}`}
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Введите вендора"
                />
                {formErrors.brand && (
                  <span className="error-message">{formErrors.brand}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Артикул</label>
                <input
                  type="text"
                  className={`form-input ${formErrors.sku ? 'error' : ''}`}
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Введите артикул"
                />
                {formErrors.sku && (
                  <span className="error-message">{formErrors.sku}</span>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </button>
                <button type="submit" className="submit-button">
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
