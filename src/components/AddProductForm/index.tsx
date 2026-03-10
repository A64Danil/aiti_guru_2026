import { useState, type FormEvent } from 'react';
import type { Product, AddProductFormData } from '../../types';
import { MESSAGES } from '../../constants';

interface AddProductFormProps {
  onSubmit: (product: Product) => void;
  onClose: () => void;
}

export function AddProductForm({ onSubmit, onClose }: AddProductFormProps) {
  const [formData, setFormData] = useState<AddProductFormData>({
    title: '',
    price: '',
    brand: '',
    sku: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof AddProductFormData, string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof AddProductFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = MESSAGES.VALIDATION_TITLE_REQUIRED;
    }
    if (!formData.price.trim()) {
      newErrors.price = MESSAGES.VALIDATION_PRICE_REQUIRED;
    }
    if (!formData.brand.trim()) {
      newErrors.brand = MESSAGES.VALIDATION_BRAND_REQUIRED;
    }
    if (!formData.sku.trim()) {
      newErrors.sku = MESSAGES.VALIDATION_SKU_REQUIRED;
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

    onSubmit(newProduct);
    setFormData({ title: '', price: '', brand: '', sku: '' });
    setFormErrors({});
  };

  return (
    <>
      <h2 className="modal-title">Добавить товар</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Наименование</label>
          <input
            type="text"
            className={`form-input ${formErrors.title ? 'error' : ''}`}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={MESSAGES.PLACEHOLDER_TITLE}
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
            placeholder={MESSAGES.PLACEHOLDER_PRICE}
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
            placeholder={MESSAGES.PLACEHOLDER_BRAND}
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
            placeholder={MESSAGES.PLACEHOLDER_SKU}
          />
          {formErrors.sku && (
            <span className="error-message">{formErrors.sku}</span>
          )}
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Отмена
          </button>
          <button type="submit" className="submit-button">
            Добавить
          </button>
        </div>
      </form>
    </>
  );
}
