const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

// Sample Categories with Subcategories
const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    icon: '📱',
    subcategories: [
      { name: 'Smartphones', description: 'Mobile phones and accessories' },
      { name: 'Laptops', description: 'Laptops and notebooks' },
      { name: 'Tablets', description: 'Tablets and e-readers' },
      { name: 'Headphones', description: 'Audio devices' }
    ]
  },
  {
    name: 'Fashion',
    description: 'Clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    icon: '👗',
    subcategories: [
      { name: 'Men\'s Clothing', description: 'Clothing for men' },
      { name: 'Women\'s Clothing', description: 'Clothing for women' },
      { name: 'Shoes', description: 'Footwear for all' },
      { name: 'Accessories', description: 'Fashion accessories' }
    ]
  },
  {
    name: 'Home & Living',
    description: 'Home decor and furniture',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    icon: '🏠',
    subcategories: [
      { name: 'Furniture', description: 'Home furniture' },
      { name: 'Decor', description: 'Home decoration items' },
      { name: 'Kitchen', description: 'Kitchen appliances and tools' },
      { name: 'Bedding', description: 'Bed sheets and pillows' }
    ]
  },
  {
    name: 'Beauty & Health',
    description: 'Beauty and health products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    icon: '💄',
    subcategories: [
      { name: 'Skincare', description: 'Skin care products' },
      { name: 'Makeup', description: 'Makeup and cosmetics' },
      { name: 'Haircare', description: 'Hair care products' },
      { name: 'Supplements', description: 'Health supplements' }
    ]
  },
  {
    name: 'Sports & Fitness',
    description: 'Sports equipment and fitness gear',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    icon: '⚽',
    subcategories: [
      { name: 'Gym Equipment', description: 'Fitness equipment' },
      { name: 'Sports Wear', description: 'Athletic clothing' },
      { name: 'Yoga', description: 'Yoga mats and accessories' },
      { name: 'Outdoor Sports', description: 'Outdoor sports gear' }
    ]
  }
];

// Sample Products
const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    shortDescription: 'Premium smartphone with cutting-edge features',
    price: 129900,
    comparePrice: 139900,
    discount: 7,
    images: [
      { url: 'https://images.unsplash.com/photo-1592286927505-2fd0f3a1f3b4?w=500', isPrimary: true }
    ],
    brand: 'Apple',
    sku: 'IPH15PRO-256-BLK',
    stock: 50,
    tags: ['smartphone', 'apple', 'premium', '5g'],
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android phone with S Pen, 200MP camera, and AI features',
    shortDescription: 'Ultimate Android flagship experience',
    price: 124999,
    comparePrice: 134999,
    discount: 7,
    images: [
      { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500', isPrimary: true }
    ],
    brand: 'Samsung',
    sku: 'SGS24U-512-GRY',
    stock: 35,
    tags: ['smartphone', 'samsung', 'android', '5g'],
    isFeatured: true
  },
  {
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M3 Max chip, stunning Liquid Retina XDR display',
    shortDescription: 'Professional-grade laptop for creators',
    price: 249900,
    comparePrice: 269900,
    discount: 7,
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', isPrimary: true }
    ],
    brand: 'Apple',
    sku: 'MBP16-M3MAX-1TB',
    stock: 20,
    tags: ['laptop', 'apple', 'macbook', 'professional'],
    isFeatured: true
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality',
    shortDescription: 'Premium wireless noise-canceling headphones',
    price: 29990,
    comparePrice: 34990,
    discount: 14,
    images: [
      { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500', isPrimary: true }
    ],
    brand: 'Sony',
    sku: 'WH1000XM5-BLK',
    stock: 100,
    tags: ['headphones', 'sony', 'wireless', 'noise-canceling'],
    isFeatured: true
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air cushioning and breathable mesh',
    shortDescription: 'Stylish and comfortable running shoes',
    price: 12995,
    comparePrice: 14995,
    discount: 13,
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', isPrimary: true }
    ],
    brand: 'Nike',
    sku: 'AIRMAX270-10-BLK',
    stock: 75,
    tags: ['shoes', 'nike', 'running', 'sports']
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight fit jeans with button fly, the original since 1873',
    shortDescription: 'Iconic straight fit denim jeans',
    price: 3999,
    comparePrice: 4999,
    discount: 20,
    images: [
      { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', isPrimary: true }
    ],
    brand: 'Levi\'s',
    sku: 'LEVIS501-32-BLU',
    stock: 150,
    tags: ['jeans', 'levis', 'denim', 'fashion']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloom');
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bloom.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('👤 Admin user created: admin@bloom.com / admin123');

    // Create categories and subcategories
    for (const catData of categories) {
      const { subcategories, ...categoryData } = catData;
      
      const category = await Category.create(categoryData);
      console.log(`📁 Created category: ${category.name}`);

      if (subcategories && subcategories.length > 0) {
        for (const subData of subcategories) {
          const subcategory = await Category.create({
            ...subData,
            parentCategory: category._id
          });
          category.subcategories.push(subcategory._id);
          console.log(`  └─ Created subcategory: ${subcategory.name}`);
        }
        await category.save();
      }
    }

    // Get categories for products
    const electronics = await Category.findOne({ name: 'Electronics' });
    const smartphones = await Category.findOne({ name: 'Smartphones' });
    const laptops = await Category.findOne({ name: 'Laptops' });
    const headphones = await Category.findOne({ name: 'Headphones' });
    const fashion = await Category.findOne({ name: 'Fashion' });
    const shoes = await Category.findOne({ name: 'Shoes' });
    const mensClothing = await Category.findOne({ name: 'Men\'s Clothing' });

    // Create products
    const products = [
      { ...sampleProducts[0], category: electronics._id, subcategory: smartphones._id },
      { ...sampleProducts[1], category: electronics._id, subcategory: smartphones._id },
      { ...sampleProducts[2], category: electronics._id, subcategory: laptops._id },
      { ...sampleProducts[3], category: electronics._id, subcategory: headphones._id },
      { ...sampleProducts[4], category: fashion._id, subcategory: shoes._id },
      { ...sampleProducts[5], category: fashion._id, subcategory: mensClothing._id }
    ];

    for (const productData of products) {
      const product = await Product.create(productData);
      console.log(`📦 Created product: ${product.name}`);
    }

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${await Category.countDocuments({ parentCategory: null })}`);
    console.log(`   Subcategories: ${await Category.countDocuments({ parentCategory: { $ne: null } })}`);
    console.log(`   Products: ${await Product.countDocuments()}`);
    console.log(`   Users: ${await User.countDocuments()}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();