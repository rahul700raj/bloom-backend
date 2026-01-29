# 📁 Project Structure

```
bloom-backend/
├── models/                 # Database models
│   ├── User.js            # User model with authentication
│   ├── Category.js        # Category with subcategories
│   ├── Product.js         # Product with variants & ratings
│   ├── Order.js           # Order management
│   └── Review.js          # Product reviews
│
├── routes/                # API routes
│   ├── auth.js           # Authentication endpoints
│   ├── categories.js     # Category CRUD
│   ├── products.js       # Product operations
│   ├── users.js          # User profile, cart, wishlist
│   ├── orders.js         # Order management
│   └── reviews.js        # Review operations
│
├── middleware/           # Custom middleware
│   └── auth.js          # JWT authentication & authorization
│
├── scripts/             # Utility scripts
│   └── seedData.js     # Database seeding
│
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies
├── server.js          # Main server file
├── README.md          # Documentation
└── DEPLOYMENT.md      # Deployment guide
```

## API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (Protected)

### Categories (`/api/categories`)
- `GET /` - Get all categories with subcategories
- `GET /:id` - Get single category
- `POST /` - Create category (Admin)
- `PUT /:id` - Update category (Admin)
- `DELETE /:id` - Delete category (Admin)

### Products (`/api/products`)
- `GET /` - Get all products (with filters)
  - Query params: category, subcategory, minPrice, maxPrice, search, sort, page, limit
- `GET /featured` - Get featured products
- `GET /:id` - Get single product
- `POST /` - Create product (Admin)
- `PUT /:id` - Update product (Admin)
- `DELETE /:id` - Delete product (Admin)

### Users (`/api/users`)
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update profile (Protected)
- `POST /wishlist/:productId` - Add to wishlist (Protected)
- `DELETE /wishlist/:productId` - Remove from wishlist (Protected)
- `POST /cart` - Add to cart (Protected)
- `PUT /cart/:productId` - Update cart item (Protected)
- `DELETE /cart/:productId` - Remove from cart (Protected)

### Orders (`/api/orders`)
- `POST /` - Create order (Protected)
- `GET /` - Get user orders (Protected)
- `GET /:id` - Get single order (Protected)
- `PUT /:id/status` - Update order status (Admin)
- `PUT /:id/cancel` - Cancel order (Protected)

### Reviews (`/api/reviews`)
- `GET /product/:productId` - Get product reviews
- `POST /` - Create review (Protected)
- `PUT /:id` - Update review (Protected)
- `DELETE /:id` - Delete review (Protected)

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String,
  role: String (user/admin),
  addresses: Array,
  wishlist: [ProductId],
  cart: [{product: ProductId, quantity: Number}],
  isActive: Boolean
}
```

### Category
```javascript
{
  name: String (unique),
  slug: String (auto-generated),
  description: String,
  image: String,
  icon: String,
  parentCategory: CategoryId,
  subcategories: [CategoryId],
  isActive: Boolean,
  order: Number
}
```

### Product
```javascript
{
  name: String,
  slug: String (auto-generated),
  description: String,
  shortDescription: String,
  price: Number,
  comparePrice: Number,
  discount: Number,
  images: [{url, alt, isPrimary}],
  category: CategoryId,
  subcategory: CategoryId,
  brand: String,
  sku: String (unique),
  stock: Number,
  inStock: Boolean,
  variants: Array,
  specifications: Map,
  tags: [String],
  rating: {average, count},
  reviews: [ReviewId],
  isFeatured: Boolean,
  isActive: Boolean,
  views: Number,
  sales: Number
}
```

### Order
```javascript
{
  orderNumber: String (auto-generated),
  user: UserId,
  items: [{product, quantity, price, total}],
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  discount: Number,
  total: Number,
  notes: String,
  trackingNumber: String,
  deliveredAt: Date,
  cancelledAt: Date,
  cancelReason: String
}
```

### Review
```javascript
{
  product: ProductId,
  user: UserId,
  rating: Number (1-5),
  title: String,
  comment: String,
  images: [String],
  isVerifiedPurchase: Boolean,
  helpful: Number,
  isApproved: Boolean
}
```

## Authentication Flow

1. User registers/logs in
2. Server generates JWT token
3. Client stores token
4. Client sends token in Authorization header: `Bearer <token>`
5. Server validates token using middleware
6. Protected routes accessible with valid token

## Error Handling

All endpoints return consistent error format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Success Response Format

```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "total": 100,
  "currentPage": 1,
  "totalPages": 10
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation
- CORS configuration
- Helmet security headers
- Rate limiting (recommended to add)
- SQL injection prevention (MongoDB)

## Performance Optimizations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Selective field population
- Caching (recommended to add)
- Image optimization (recommended)
- CDN for static assets (recommended)

## Testing

Recommended testing tools:
- Postman/Insomnia for API testing
- Jest for unit tests
- Supertest for integration tests

## Monitoring

Recommended monitoring tools:
- PM2 for process management
- Morgan for logging
- Sentry for error tracking
- New Relic for performance monitoring