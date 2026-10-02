import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import jwt from 'jsonwebtoken';

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_OMRaJf07gnUo@ep-autumn-boat-b5abmf7b-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

// Initialize database table
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        place VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'unread',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('PostgreSQL Neon DB initialized. Contacts table ready.');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
}

initDb();

const JWT_SECRET = process.env.JWT_SECRET || 'paras_business_park_secret_key_2026_9908';

// Middleware to verify admin token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
}

// Public API: Save contact inquiry
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, place, message } = req.body;

  if (!name || !email || !phone || !place || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, place, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name.trim(), email.trim(), phone.trim(), place.trim(), message.trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Contact stored successfully in database.',
      contact: result.rows[0]
    });
  } catch (err) {
    console.error('Error saving contact to DB:', err);
    res.status(500).json({ error: 'Failed to save contact inquiry to database.' });
  }
});

// Admin API: Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME || 'parasbusinesspark@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'parasbusinesspark@9908';

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      success: true,
      token,
      admin: { username }
    });
  }

  return res.status(401).json({ error: 'Invalid username or password.' });
});

// Admin API: Verify current token
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Admin API: Get all contacts
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json({ contacts: result.rows });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts from database.' });
  }
});

// Admin API: Update contact status
app.patch('/api/admin/contacts/:id/status', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: 'Status is required.' });

  try {
    const result = await pool.query(
      'UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json({ success: true, contact: result.rows[0] });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Failed to update contact status.' });
  }
});

// Admin API: Delete contact
app.delete('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json({ success: true, message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;

