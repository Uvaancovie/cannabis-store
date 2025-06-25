# Cannabis Marketplace - Next.js Web Application

A modern, full-featured cannabis marketplace web application built with Next.js, Firebase, and TypeScript. This application provides a complete e-commerce solution for cannabis products with role-based authentication, admin management, and customer shopping features.

## 🚀 Features

### Authentication & Authorization
- **Role-based Authentication**: Admin and Customer roles
- **Firebase Authentication**: Secure login/signup with email
- **Protected Routes**: Automatic redirection based on user roles
- **User Management**: Secure user data handling

### Admin Features
- **Product Management**: Add, edit, delete, and manage product inventory
- **Image Upload**: Firebase Storage integration for product images
- **Inventory Tracking**: Stock management and status controls
- **Dashboard**: Comprehensive admin overview
- **Order Management**: View and manage customer orders

### Customer Features
- **Product Catalog**: Browse products with search and filters
- **Shopping Cart**: Add products and manage cart items
- **Order History**: View past orders and order status
- **User Profile**: Manage personal information
- **Responsive Design**: Mobile-friendly shopping experience

### Technical Features
- **Real-time Database**: Firestore for live data synchronization
- **Image Storage**: Firebase Storage for product images
- **TypeScript**: Full type safety throughout the application
- **Responsive UI**: Tailwind CSS for modern, mobile-first design
- **Error Handling**: Comprehensive error states and loading indicators
- **SEO Optimized**: Next.js features for search engine optimization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- A Firebase project set up
- Git installed

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Uvaancovie/cannabis-store.git
   cd cannabis-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Firebase Storage
   - Copy your Firebase config

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting Started

## 🏗️ Project Structure

```
cannabis-marketplace-web/
├── app/                          # Next.js 13+ app directory
│   ├── admin/                    # Admin pages
│   │   ├── dashboard/
│   │   ├── products/
│   │   └── orders/
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── customer/                 # Customer pages
│   │   ├── dashboard/
│   │   ├── shop/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── profile/
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── src/
│   ├── components/               # Reusable components
│   │   ├── CustomerNavigation.tsx
│   │   └── ProductForm.tsx
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx
│   ├── firebase/                 # Firebase configuration
│   │   └── config.ts
│   ├── providers/                # Context providers
│   │   └── Providers.tsx
│   └── services/                 # API services
│       └── productService.ts
├── public/                       # Static assets
└── ...config files
```

## 🎯 Usage

### For Admins
1. Sign up with an admin account
2. Access the admin dashboard
3. Add products with images and details
4. Manage inventory and product status
5. View and manage customer orders

### For Customers
1. Sign up as a customer
2. Browse the product catalog
3. Add items to cart
4. View order history
5. Manage profile information

## 🔐 Security Features

- **Authentication Required**: All sensitive routes are protected
- **Role-based Access**: Admin and customer areas are separated
- **Input Validation**: Form validation on all user inputs
- **Image Upload Security**: File type and size validation
- **Error Boundaries**: Graceful error handling

## 🚀 Deployment

This application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase services.
- [Tailwind CSS](https://tailwindcss.com/docs) - learn about utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org/docs/) - learn about TypeScript.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in appropriate `app/` subdirectories
3. Update services in `src/services/` for Firebase operations
4. Follow TypeScript best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔮 Future Enhancements

- Payment integration
- Email notifications
- Advanced search and filtering
- Product reviews and ratings
- Real-time chat support
- Mobile app version
- Multi-vendor support

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify Firebase configuration
3. Ensure all environment variables are set
4. Check network connectivity

For questions or support, please open an issue on GitHub.

---

**Note**: This application is for educational purposes. Ensure compliance with local laws and regulations regarding cannabis products in your jurisdiction.
