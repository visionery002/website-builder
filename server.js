import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS so your frontend (Vite running on port 5173) can talk to your backend
app.use(cors({
  origin: '*' // In production, replace with your frontend URL
}));
app.use(express.json());

// Initialize PostgreSQL Connection Pool
if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not set in your .env file.');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Helper function to map frontend contact form values to Supabase database Enum values
function mapProjectCategory(frontendCategory) {
  const mapping = {
    'business-website': 'business_website',
    'ecommerce': 'e-commerce_store',
    'brand-identity': 'brand_identity',
    'jump-start': 'business_jumpstart_package',
    'mobile-app': 'mobile_application',
    'desktop-software': 'desktop_software',
    'telebirr-miniapp': 'telebirr_miniapp',
    'tiktok-store': 'tiktok_store',
    'telegram-bot': 'telegram_bot',
    'digital-payment': 'digital_payment',
    'other': 'custom_works',
    'video': 'custom_works',          // Maps to custom works since it's not in the main enum
    'online-setup': 'custom_works'     // Maps to custom works
  };

  return mapping[frontendCategory] || 'custom_works';
}

// POST endpoint to record a new client order
app.post('/api/clients', async (req, res) => {
  const { name, business, phone, email, projectType, message } = req.body;

  // Basic validation
  if (!name || !phone || !projectType) {
    return res.status(400).json({ error: 'Name, Phone/Telegram, and Project Type are required.' });
  }

  // Map category to the PostgreSQL enum values
  const dbCategory = mapProjectCategory(projectType);

  // We will store the Telegram username or phone number.
  // If the input looks like a Telegram handle (starts with @ or is a handle), we can save it to telegram_username, otherwise phone_number
  let telegramUsername = null;
  let phoneNumber = phone;

  if (phone.startsWith('@') || (!phone.includes('+') && phone.length < 32 && isNaN(Number(phone.replace(/\s/g, ''))))) {
    telegramUsername = phone.replace('@', ''); // Strip @ symbol
  }

  try {
    const queryText = `
      INSERT INTO clients (user_name, business_name, phone_number, gmail, telegram_username, category, business_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      name,
      business || null,
      phoneNumber,
      email || null,
      telegramUsername,
      dbCategory,
      message || null
    ];

    const result = await pool.query(queryText, values);
    
    console.log('🎉 New client recorded in database:', result.rows[0]);
    
    res.status(201).json({
      success: true,
      message: 'Client order recorded successfully!',
      client: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Database insertion error:', error);
    res.status(500).json({ error: 'Failed to save client order to database.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', database: 'connected' });
});

// Friendly root route to prevent 'Cannot GET /'
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Ethiopian Websites Node.js & Supabase Backend is running!',
    endpoints: {
      health: '/api/health',
      submitOrder: '/api/clients (POST)'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js backend running on http://localhost:${PORT}`);
});
