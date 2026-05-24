# Deployment Guide

## Production Build

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Tree-shaken unused code
- Optimized assets

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally at `http://localhost:4173` for testing before deployment.

## Environment Variables

Create a `.env.production` file in the project root:

```env
VITE_API_BASE_URL=https://api.example.com
```

Environment variables must be prefixed with `VITE_` to be accessible in the browser.

## Deployment Platforms

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Vite configuration
3. Default build command: `npm run build`
4. Default output directory: `dist`
5. Deploy on every push to main branch

Configuration in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "./dist"
}
```

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Create `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### GitHub Pages

1. Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/Music-Player/',
  // ... rest of config
})
```

2. Build and deploy:

```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Or use GitHub Actions workflow.

### Traditional Hosting (Shared Hosting/VPS)

1. Build locally:
   ```bash
   npm run build
   ```

2. Upload `dist/` folder to your server via FTP/SFTP

3. Configure web server (nginx/Apache) to serve `index.html` for all routes

**nginx configuration**:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/music-player/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache configuration**:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and run:

```bash
docker build -t music-player .
docker run -p 3000:3000 music-player
```

## Performance Optimization

### Before Deployment

1. Run production build locally:
   ```bash
   npm run build
   npm run preview
   ```

2. Run Lighthouse audit:
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Generate report
   - Target scores: Performance 90+, Accessibility 95+

3. Check bundle size:
   ```bash
   npm run build
   # Review dist folder size and file breakdown
   ```

### Optimization Techniques

- Enable gzip compression on server
- Use CDN for static assets
- Implement caching headers
- Optimize images
- Code splitting for routes

## Monitoring and Analytics

### Error Tracking

Consider integrating error tracking services:
- Sentry
- Rollbar
- LogRocket

### Analytics

Add analytics to track usage:
- Google Analytics
- Mixpanel
- Plausible

## Security Checklist

Before deploying to production:

- [ ] Remove sensitive data from code
- [ ] Update dependencies: `npm audit fix`
- [ ] Enable HTTPS
- [ ] Set security headers (CSP, X-Frame-Options)
- [ ] Review environment variables
- [ ] Test error scenarios
- [ ] Verify API endpoints are secure
- [ ] Enable CORS properly if needed

### Security Headers (nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## Post-Deployment

### Verification

1. Test all features in production
2. Verify performance metrics
3. Check error tracking service
4. Monitor analytics

### Maintenance

- Regularly update dependencies
- Monitor security advisories
- Keep eye on error logs
- Update documentation

## Rollback Procedure

If issues are found in production:

1. **Quick Rollback**: Revert to previous deployment
2. **Fix and Redeploy**: Fix issues locally and redeploy
3. **Blue-Green Deployment**: Keep previous version running

For Vercel/Netlify: Use platform's rollback features in deployment history.

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Common Issues

### Build Fails

1. Check Node.js version: `node --version`
2. Clear cache: `rm -rf node_modules dist && npm install`
3. Check for TypeScript errors: `npm run build`

### White Screen After Deployment

- Check browser console for errors
- Verify base URL in `vite.config.ts`
- Check that `dist/index.html` exists
- Verify server routing configuration

### 404 Errors on Refresh

- Configure server to serve `index.html` for all routes
- Check routing configuration in deployment platform

## Support

For deployment issues:
- Refer to [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- Check platform-specific documentation
- Review error logs and monitoring services
