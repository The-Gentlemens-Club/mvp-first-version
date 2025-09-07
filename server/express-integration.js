const express = require('express');
let Database;
let db;

// Try to use Replit Database, fallback to in-memory storage
try {
  Database = require('@replit/database');
  db = new Database();
} catch (error) {
  console.log('Replit Database not available, using in-memory storage');
  db = new Map();
}

const app = express();

app.use(express.json());
app.use(express.static('public'));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/join', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Check for existing user
    let existing;
    if (db instanceof Map) {
      existing = db.get(`user:${email}`);
    } else {
      existing = await db.get(`user:${email}`);
    }

    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Store user data
    const userData = {
      email,
      password, // Use bcrypt in production
      name: name || '',
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    if (db instanceof Map) {
      db.set(`user:${email}`, userData);
    } else {
      await db.set(`user:${email}`, userData);
    }

    console.log(`New user registered: ${email}`);
    
    res.status(200).json({ 
      success: true,
      message: 'Registration successful',
      data: {
        email,
        name: name || '',
        timestamp: userData.timestamp
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/join', async (req, res) => {
  // Same logic as /join endpoint for API consistency
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    let existing;
    if (db instanceof Map) {
      existing = db.get(`user:${email}`);
    } else {
      existing = await db.get(`user:${email}`);
    }

    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const userData = {
      email,
      password, // Use bcrypt in production
      name: name || '',
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    if (db instanceof Map) {
      db.set(`user:${email}`, userData);
    } else {
      await db.set(`user:${email}`, userData);
    }

    console.log(`New user registered via API: ${email}`);
    
    res.status(200).json({ 
      success: true,
      message: 'Successfully joined the Gentlemen Club!',
      data: {
        email,
        name: name || '',
        timestamp: userData.timestamp
      }
    });
  } catch (error) {
    console.error('API registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (admin endpoint)
app.get('/api/users', async (req, res) => {
  try {
    let users = [];
    
    if (db instanceof Map) {
      for (const [key, value] of db.entries()) {
        if (key.startsWith('user:')) {
          users.push({
            email: value.email,
            name: value.name,
            timestamp: value.timestamp
          });
        }
      }
    } else {
      // For Replit DB, we'd need to implement a way to list all keys
      // This is a limitation of the current Replit DB API
      users = [{ message: 'User listing not available with Replit DB' }];
    }

    res.json({
      total: users.length,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: db instanceof Map ? 'in-memory' : 'replit-db'
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Database type: ${db instanceof Map ? 'in-memory' : 'replit-db'}`);
});

module.exports = app;