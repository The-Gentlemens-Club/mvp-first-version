# Deployment Guide - Gentlemen Club Platform

## 🚀 Deployment Options

### 1. Replit Deployment (Recommended for PoC)

#### Prerequisites
- Replit account
- Project forked to your Replit workspace

#### Steps
1. **Environment Configuration**
   ```bash
   # In Replit Secrets tab, add:
   DATABASE_URL=your_neon_database_url
   VITE_TRACKING_ID=your_google_analytics_id
   SECRET_KEY=your_flask_secret_key
   ```

2. **Start the Application**
   ```bash
   npm run dev
   ```

3. **Access Your Application**
   - Frontend: Your Replit URL (automatic)
   - Flask Backend: Port 8080
   - Express Backend: Port 8080 (alternative)

#### Replit-Specific Features
- **Automatic SSL**: HTTPS enabled by default
- **Custom Domains**: Available with Replit Pro
- **Environment Variables**: Secure secrets management
- **Database Integration**: Replit DB available as fallback

### 2. Production Deployment

#### Option A: Vercel + Railway/Render

**Frontend (Vercel)**
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
VITE_TRACKING_ID=GA_MEASUREMENT_ID
VITE_API_URL=https://your-backend-url.com
```

**Backend (Railway/Render)**
```bash
# Node.js Backend
npm install
npm start

# Python Backend
pip install -r requirements.txt
python server/flask-integration.py
```

#### Option B: Docker Deployment

**Dockerfile (Frontend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

**Dockerfile (Backend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "run", "server"]
```

**Docker Compose**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:5000
  
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
  
  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=gentlemen_club
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. Cloud Platform Deployments

#### AWS Deployment
```bash
# Using AWS Amplify for frontend
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish

# Using AWS Lambda for backend
serverless deploy
```

#### Google Cloud Platform
```bash
# Frontend to Firebase Hosting
npm install -g firebase-tools
firebase init
firebase deploy

# Backend to Cloud Run
gcloud run deploy gentlemen-club-api --source .
```

#### Azure Deployment
```bash
# Frontend to Azure Static Web Apps
az staticwebapp create \
  --name gentlemen-club \
  --source .

# Backend to Azure Container Instances
az container create \
  --resource-group myResourceGroup \
  --name gentlemen-club-api \
  --image your-registry/gentlemen-club:latest
```

## 🔧 Configuration Management

### Environment Variables

**Frontend (.env)**
```bash
VITE_API_URL=https://api.gentlemensclub.com
VITE_TRACKING_ID=G-XXXXXXXXXX
VITE_APP_NAME=Gentlemen Club
VITE_NETWORK_ID=11155111
```

**Backend (.env)**
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=https://gentlemensclub.com
REDIS_URL=redis://localhost:6379
SENTRY_DSN=your-sentry-dsn
```

### Database Configuration

**PostgreSQL (Production)**
```sql
-- Create database
CREATE DATABASE gentlemen_club;

-- Create user
CREATE USER club_admin WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE gentlemen_club TO club_admin;

-- Run migrations
npm run db:migrate
```

**Neon Database (Recommended)**
```bash
# Get connection string from Neon Dashboard
DATABASE_URL=postgresql://username:password@ep-name.region.neon.tech/dbname?sslmode=require
```

## 📊 Monitoring & Analytics

### Application Monitoring
```bash
# Install monitoring tools
npm install @sentry/node @sentry/react

# Configure Sentry
SENTRY_DSN=your_sentry_dsn
SENTRY_ENVIRONMENT=production
```

### Performance Monitoring
```javascript
// Google Analytics 4 Configuration
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'Gentlemen Club',
  page_location: window.location.href,
  custom_map: {
    'custom_parameter': 'user_type'
  }
});
```

### Health Checks
```bash
# Application health endpoint
GET /api/health

# Database health check
GET /api/health/db

# External services health
GET /api/health/services
```

## 🔐 Security Configuration

### SSL/TLS Setup
```nginx
# Nginx configuration
server {
    listen 443 ssl http2;
    server_name gentlemensclub.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### CORS Configuration
```javascript
// Express.js CORS setup
app.use(cors({
  origin: ['https://gentlemensclub.com', 'https://www.gentlemensclub.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Rate Limiting
```javascript
// Express rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

## 🚀 Performance Optimization

### Frontend Optimization
```bash
# Build optimization
npm run build

# Bundle analysis
npm run build:analyze

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

### Backend Optimization
```javascript
// Compression middleware
const compression = require('compression');
app.use(compression());

// Static file caching
app.use(express.static('public', {
  maxAge: '1y',
  etag: false
}));
```

### Database Optimization
```sql
-- Index creation for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Query optimization
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] DNS records configured
- [ ] Monitoring tools setup
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] CORS policies set
- [ ] Error logging configured

### Post-Deployment
- [ ] Health checks passing
- [ ] Analytics tracking verified
- [ ] Performance metrics baseline established
- [ ] Security scan completed
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured
- [ ] Load testing completed
- [ ] Documentation updated

### Ongoing Maintenance
- [ ] Regular security updates
- [ ] Performance monitoring
- [ ] Database optimization
- [ ] Log analysis
- [ ] User feedback collection
- [ ] Feature usage analytics
- [ ] Cost optimization review

## 🛠️ Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls
```

**Database Connection Issues**
```bash
# Test database connection
psql $DATABASE_URL

# Check connection pooling
# Ensure max connections < database limit
```

**CORS Errors**
```javascript
// Verify origin configuration
console.log('Request origin:', req.headers.origin);
console.log('Allowed origins:', allowedOrigins);
```

### Monitoring Commands
```bash
# Check application logs
docker logs container-name -f

# Monitor resource usage
htop
df -h
free -m

# Database performance
SELECT * FROM pg_stat_activity;
```

---

For additional support, refer to the main README.md or contact the development team.