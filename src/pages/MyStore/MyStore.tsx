import React, { useState, useEffect } from 'react';
import styles from './MyStore.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../Navbar/Navbar';
import { useProducts, Product } from '../../hooks/useProducts';

export const MyStore: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    error,
  } = useProducts();
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fill the form when editing a product
  useEffect(() => {
    if (editingProduct) {
      setNewProduct({
        title: editingProduct.title,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
      });
    }
  }, [editingProduct]);

  // If still loading or error
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  /** ✅ Add Product */
  const handleAddProduct = async () => {
    try {
      await addProduct({
        title: newProduct.title,
        price: Number(newProduct.price),
        image: newProduct.image,
      });
      toast.success('Product added successfully!');
      setNewProduct({ title: '', price: '', image: '' });
    } catch {
      toast.error('Failed to add product!');
    }
  };

  /** ✅ Edit Product */
  const handleEditProduct = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct({
        id: editingProduct.id,
        updatedProduct: newProduct,
      });
      toast.success('Product updated successfully!');
      setEditingProduct(null);
      setNewProduct({ title: '', price: '', image: '' });
    } catch {
      toast.error('Failed to update product!');
    }
  };

  /** ✅ Delete Product */
  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
    } catch {
      toast.error('Failed to delete product!');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>My Store</h1>
        <p className={styles.subtitle}>Manage your products with ease</p>

        {/* Add / Edit Product Form */}
        <div className={styles.formContainer}>
          <input
            type='text'
            placeholder='Product Name'
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Price'
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type='text'
            placeholder='Image URL'
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          {editingProduct ? (
            <button className={styles.editButton} onClick={handleEditProduct}>
              Update Product
            </button>
          ) : (
            <button className={styles.addButton} onClick={handleAddProduct}>
              Add Product
            </button>
          )}
        </div>

        {/* Product List */}
        <div className={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.title}</h2>
                  <p className={styles.productPrice}>${product.price}</p>
                  <button
                    className={styles.editButton}
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};
