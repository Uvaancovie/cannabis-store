'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../src/contexts/AuthContext';
import { Product, getActiveProducts } from '../src/services/productService';

export default function Home() {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        // Redirect based on user role
        if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else if (userRole === 'customer') {
          router.push('/customer/dashboard');
        }
      } else {
        // Load featured products for non-logged in users
        loadFeaturedProducts();
      }
    }
  }, [currentUser, userRole, loading, router]);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const products = await getActiveProducts();
      // Get first 3 products as featured
      setFeaturedProducts(products.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured products:', error);
      // Use sample data as fallback
      setFeaturedProducts([
        {
          id: '1',
          name: 'Premium CBD Oil',
          description: 'High-quality CBD oil for relaxation and pain relief.',
          price: 49.99,
          imageUrl: '/next.svg',
          category: 'Oils',
          stock: 0,
          status: 'active' as const
        },
        {
          id: '2',
          name: 'Cannabis Gummies',
          description: 'Delicious and potent cannabis-infused gummies.',
          price: 29.99,
          imageUrl: '/vercel.svg',
          category: 'Edibles',
          stock: 0,
          status: 'active' as const
        },
        {
          id: '3',
          name: 'THC Vape Cartridge',
          description: 'Pure THC vape cartridge for a smooth experience.',
          price: 39.99,
          imageUrl: '/next.svg',
          category: 'Vapes',
          stock: 0,
          status: 'active' as const
        }
      ]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar for logged-in users */}
      {currentUser && (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-green-600">Cannabis Marketplace</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome back!</span>
                <Link
                  href={userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 py-32 text-center bg-gradient-to-r from-green-500 to-green-700 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Cannabis Marketplace
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop shop for premium cannabis products delivered right to your door.
          </p>
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="bg-white text-green-700 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-green-800 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-900 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
          {currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={userRole === 'admin' ? '/admin/dashboard' : '/customer/shop'}
                className="bg-white text-green-700 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition"
              >
                {userRole === 'admin' ? 'Manage Store' : 'Start Shopping'}
              </Link>
              <Link
                href={userRole === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                className="bg-green-800 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-900 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Featured Products Section */}
      {!currentUser && (
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-4"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-8 bg-gray-300 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                      <Link 
                        href="/auth/signup"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Sign Up to Buy
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-lg">No products available yet.</p>
                <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
              </div>
            )}
            
            {!isLoadingProducts && featuredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Link 
                  href="/auth/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Join Now to Shop All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Cannabis Marketplace?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/file.svg"
                  alt="Wide Selection"
                  width={64}
                  height={64}
                  className="text-green-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Browse through our extensive collection of lab-tested, premium cannabis products from trusted suppliers.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/window.svg"
                  alt="Secure Platform"
                  width={64}
                  height={64}
                  className="text-green-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Shop with confidence on our secure platform with encrypted transactions and discreet packaging.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Image
                  src="/globe.svg"
                  alt="Easy Checkout"
                  width={64}
                  height={64}
                  className="text-green-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Checkout</h3>
              <p className="text-gray-600">Simple and convenient checkout process through WhatsApp for a personalized shopping experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      {!currentUser && (
        <div className="py-16 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied customers who trust Cannabis Marketplace for their cannabis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-green-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-green-700 transition"
              >
                Create Account - It's Free!
              </Link>
              <Link
                href="/auth/login"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-green-50 transition"
              >
                Already Have Account?
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <div className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">10,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-300">Trusted Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Cannabis Marketplace</h3>
            <p className="text-gray-400">© 2025 All Rights Reserved</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/terms" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
