# 🚀 Deployment Guide

## Railway Deployment (Free Hosting)

### Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)

### Steps

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/rahul700raj/bloom-backend.git
   cd bloom-backend
   ```

2. **Sign up on Railway**
   - Go to https://railway.app
   - Sign up with GitHub
   - Connect your GitHub account

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `bloom-backend` repository
   - Railway will auto-detect Node.js

4. **Add MongoDB Database**
   - In your project, click "New"
   - Select "Database" → "Add MongoDB"
   - Railway will provision a MongoDB instance
   - Copy the connection string

5. **Set Environment Variables**
   - Go to your service settings
   - Click "Variables" tab
   - Add these variables:
   ```
   PORT=5000
   MONGODB_URI=<your-railway-mongodb-connection-string>
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

6. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete
   - You'll get a public URL like: `https://bloom-backend-production.up.railway.app`

7. **Seed Database (Optional)**
   - Go to Railway dashboard
   - Open your service
   - Click "Settings" → "Deploy"
   - Add custom start command: `node scripts/seedData.js && node server.js`
   - Or run seed script manually via Railway CLI

8. **Test API**
   ```bash
   curl https://your-railway-url.railway.app/
   ```

## Alternative: Render.com Deployment

1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables
5. Deploy

## Alternative: Heroku Deployment

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create bloom-backend`
4. Add MongoDB: `heroku addons:create mongolab`
5. Set env vars: `heroku config:set JWT_SECRET=your_secret`
6. Deploy: `git push heroku main`

## Alternative: DigitalOcean App Platform

1. Sign up at DigitalOcean
2. Create new App
3. Connect GitHub
4. Add MongoDB database
5. Configure environment variables
6. Deploy

## Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI

# Start development server
npm run dev

# Seed database
node scripts/seedData.js
```

## Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use production MongoDB (MongoDB Atlas recommended)
- [ ] Enable CORS for your frontend domain only
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Configure backup strategy for database
- [ ] Set up CI/CD pipeline
- [ ] Enable HTTPS
- [ ] Configure domain name

## MongoDB Atlas Setup (Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for Railway)
5. Get connection string
6. Use in MONGODB_URI environment variable

## API URL

After deployment, your API will be available at:
```
https://your-app-name.railway.app/api/
```

Update this URL in your Android app's `build.gradle`:
```gradle
buildConfigField "String", "API_BASE_URL", '"https://your-app-name.railway.app/api/"'
```

## Troubleshooting

### Port Issues
- Railway automatically assigns PORT
- Make sure your code uses `process.env.PORT`

### MongoDB Connection
- Check connection string format
- Ensure IP whitelist includes Railway IPs
- Verify database user credentials

### Environment Variables
- Double-check all required variables are set
- No quotes needed in Railway dashboard

### Build Failures
- Check Node.js version compatibility
- Verify package.json scripts
- Review build logs in Railway dashboard

## Support

For issues, create an issue on GitHub or contact rm2778643@gmail.com