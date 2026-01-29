# 🌸 Bloom Backend API

Advanced e-commerce backend API built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Categories & Subcategories** - Hierarchical category management
- **Products** - Complete product management with variants, images, ratings
- **Shopping Cart & Wishlist** - User cart and wishlist functionality
- **Orders** - Order management with status tracking
- **Reviews & Ratings** - Product reviews with automatic rating calculation
- **Advanced Filtering** - Search, filter, sort, and pagination
- **Security** - Helmet, CORS, password hashing with bcrypt

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/rahul700raj/bloom-backend.git
cd bloom-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start server
npm start

# Development mode with nodemon
npm run dev
```

## 🔧 Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `POST /api/users/cart` - Add to cart
- `PUT /api/users/cart/:productId` - Update cart item
- `DELETE /api/users/cart/:productId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🎯 Query Parameters

### Products Filtering
```
GET /api/products?category=ID&minPrice=100&maxPrice=1000&search=keyword&sort=-price&page=1&limit=12
```

## 🔐 Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📱 Sample Data Structure

### Category
```json
{
  "name": "Electronics",
  "description": "Electronic items and gadgets",
  "image": "https://example.com/image.jpg",
  "parentCategory": null,
  "subcategories": []
}
```

### Product
```json
{
  "name": "Smartphone X",
  "description": "Latest smartphone with amazing features",
  "price": 29999,
  "category": "category_id",
  "images": [
    {
      "url": "https://example.com/image1.jpg",
      "isPrimary": true
    }
  ],
  "stock": 50,
  "tags": ["smartphone", "electronics"]
}
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

**Rahul Mishra**
- GitHub: [@rahul700raj](https://github.com/rahul700raj)
- Email: rm2778643@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ for the Bloom App