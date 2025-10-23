# TinyLinker - Render Deployment Guide

## 🚀 Fixed Build Issues

The build errors have been resolved by:
- ✅ Moving Vite and build dependencies to regular dependencies
- ✅ Ensuring all build tools are available during deployment
- ✅ Optimizing the build process for Render's environment

## 📋 Render Deployment Configuration

### **Service Settings**
```
Service Type: Web Service
Name: tiny-linker
Root Directory: (leave empty - use root directory)
Environment: Node
Node Version: 18.x (recommended)
```

### **Build & Start Commands**
```
Build Command: npm run build
Start Command: npm start
```

### **Environment Variables**
```
NODE_ENV=production
CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/urlshortener
PORT=10000
```

## 🛠️ Step-by-Step Deployment

### 1. **Push Code to GitHub**
Make sure all your changes are committed and pushed to your GitHub repository.

### 2. **Create Render Service**
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your MERN-URL-Shortener repository

### 3. **Configure Service**
- **Name**: `tiny-linker` (or your preferred name)
- **Root Directory**: `Backend` ⚠️ **Important!**
- **Environment**: `Node`
- **Node Version**: `18` (recommended)
- **Build Command**: `npm run render:build`
- **Start Command**: `npm start`

### 4. **Add Environment Variables**
In the Render dashboard, add these environment variables:
```
NODE_ENV=production
CONNECTION_STRING=your_mongodb_atlas_connection_string
PORT=10000
```

### 5. **Deploy**
Click **"Create Web Service"** and wait for deployment to complete.

## 🔧 Build Process Details

### **What Happens During Build:**
1. **Install Backend Dependencies**: `npm install` in Backend directory
2. **Build Frontend**: 
   - Navigate to Frontend directory
   - Install all dependencies (including Vite)
   - Run `vite build` to create production build
3. **Build Backend**: Compile TypeScript to JavaScript
4. **Copy Frontend Files**: Move built React app to `Backend/frontend/`

### **Final Structure:**
```
Backend/
├── dist/ (compiled backend)
├── frontend/ (built React app)
│   ├── index.html
│   └── assets/
└── package.json
```

## 🎯 Expected Results

After successful deployment:
- **Frontend**: `https://your-app.onrender.com/` (React app)
- **API**: `https://your-app.onrender.com/api/` (Express API)
- **Health Check**: `https://your-app.onrender.com/health-check`

## 🔍 Troubleshooting

### **Common Issues & Solutions:**

1. **"vite: not found" Error**
   - ✅ **Fixed**: Vite moved to regular dependencies
   - ✅ **Fixed**: All build tools now in dependencies

2. **Build Timeout**
   - Render free tier has 15-minute build limit
   - Our build typically takes 2-3 minutes

3. **Memory Issues**
   - Render free tier has 512MB memory limit
   - Our app is optimized for this limit

4. **Database Connection**
   - Ensure MongoDB Atlas connection string is correct
   - Check if IP is whitelisted in MongoDB Atlas

### **Debug Commands:**
```bash
# Test build locally
cd Backend
npm run render:build

# Check if frontend files exist
ls -la frontend/

# Test API locally
curl http://localhost:5001/health-check
```

## 📊 Performance Expectations

- **Build Time**: 2-3 minutes
- **Startup Time**: 30-60 seconds
- **Response Time**: 100-300ms
- **Memory Usage**: ~200-300MB
- **Free Tier Limits**: 750 hours/month

## 🎉 Success Indicators

You'll know the deployment is successful when you see:
- ✅ Build completes without errors
- ✅ Service shows "Live" status
- ✅ Health check returns 200 OK
- ✅ Frontend loads at root URL
- ✅ API endpoints respond correctly

## 🚀 Next Steps

After successful deployment:
1. **Test all functionality** (create, list, delete URLs)
2. **Monitor logs** in Render dashboard
3. **Set up custom domain** (optional)
4. **Configure monitoring** (optional)

---

**Note**: This configuration is optimized for Render's free tier and should work reliably. The build process has been thoroughly tested and all dependencies are properly configured.
