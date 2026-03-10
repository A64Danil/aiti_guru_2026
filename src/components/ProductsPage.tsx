import { useState, type ChangeEvent } from 'react';
import { useProducts, useAuth } from '../hooks';
import { Modal } from './Modal';
import { AddProductForm } from './AddProductForm';
import type { Product, SortField } from '../types';

export function ProductsPage() {
  const { products, isLoading, error, searchQuery, sortState, handleSort, addProduct, search } = useProducts();
  const { logout } = useAuth();
  
  const [showModal, setShowModal] = useState(false);

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
  const handleAddProduct = (product: Product) => {
    addProduct(product);
    setShowModal(false);
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
