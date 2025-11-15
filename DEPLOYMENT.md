# Firebase Deployment Instructions

## Prerequisites
1. Make sure Firebase CLI is installed:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

## Build and Deploy Steps

### 1. Build the project
```bash
npm run build
```
This creates the `dist` folder with your production-ready files.

### 2. Initialize Firebase (if not done already)
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Don't overwrite index.html

### 3. Deploy to Firebase
```bash
firebase deploy
```

Your app will be live at: https://your-project-name.web.app

## Verify Deployment
After deployment, check:
- ✅ All routes work (/, /explore, /favorites, /login)
- ✅ Navigation links work properly
- ✅ Interactive features work (search, filter, sort on Favorites page)
- ✅ No console errors
- ✅ Footer displays correctly

## Quick Commands
```bash
# Build
npm run build

# Deploy
firebase deploy

# Build and Deploy (combined)
npm run build && firebase deploy
```
