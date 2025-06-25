'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../../src/contexts/AuthContext';
import CustomerNavigation from '../../../src/components/CustomerNavigation';
import { Product, getActiveProducts } from '../../../src/services/productService';

export default function CustomerShop() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Flowers', 'Edibles', 'Concentrates', 'Vapes', 'Oils', 'Topicals', 'Accessories', 'Seeds'];

  // Protect the customer route and load products
  useEffect(() => {
    if (!loading) {      if (!currentUser) {
        router.push('/auth/login');
      } else if (userRole !== 'customer') {
        router.push('/');
      } else {
        loadProducts();
      }
    }
  }, [currentUser, userRole, loading, router]);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const loadProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const fetchedProducts = await getActiveProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  if (loading || isLoadingProducts) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!currentUser || userRole !== 'customer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerNavigation />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shop Cannabis Products</h1>
            <p className="mt-2 text-gray-600">Browse our full collection of premium cannabis products.</p>
          </header>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{objectFit: 'cover'}}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-600">${product.price.toFixed(2)}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                      Add to Cart
                    </button>                  </div>
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'No products found matching your criteria.' 
                  : 'No products available yet.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
