import axios from 'axios';

// Centralized Axios instance with base URL and sane timeout
const API_BASE = 'https://fakestoreapi.com';
const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

/**
 * Fetch all products
 * Accepts AbortSignal via options for request cancellation
 */
export async function fetchProducts(options = {}) {
  const { signal } = options;
  const { data } = await api.get('/products', { signal });
  return data;
}

/**
 * Fetch a single product by id
 */
export async function fetchProductById(productId, options = {}) {
  const { signal } = options;
  const { data } = await api.get(`/products/${productId}`, { signal });
  return data;
}

/**
 * Fetch all product categories
 */
export async function fetchCategories(options = {}) {
  const { signal } = options;
  const { data } = await api.get('/products/categories', { signal });
  return data;
}

/**
 * Fetch products filtered by category
 */
export async function fetchProductsByCategory(category, options = {}) {
  const { signal } = options;
  const { data } = await api.get(`/products/category/${encodeURIComponent(category)}`, { signal });
  return data;
}


