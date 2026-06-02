import pg from 'pg';

// Initialize PostgreSQL Connection Pool
// Vercel serverless environment will reuse this connection pool across requests if the container stays warm.
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
    'video': 'custom_works',
    'online-setup': 'custom_works'
  };

  return mapping[frontendCategory] || 'custom_works';
}

export default async function handler(req, res) {
  // Enable CORS headers for Vercel environment
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for registering clients
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, phone, email, projectType, message } = req.body;

  // Basic validation
  if (!name || !phone || !projectType) {
    return res.status(400).json({ error: 'Name, Phone/Telegram, and Project Type are required.' });
  }

  // Map category to database enum
  const dbCategory = mapProjectCategory(projectType);

  let telegramUsername = null;
  let phoneNumber = phone;

  // Telegram handle check
  if (phone.startsWith('@') || (!phone.includes('+') && phone.length < 32 && isNaN(Number(phone.replace(/\s/g, ''))))) {
    telegramUsername = phone.replace('@', '');
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
    
    return res.status(201).json({
      success: true,
      message: 'Client order recorded successfully!',
      client: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Database insertion error:', error);
    return res.status(500).json({ error: 'Failed to save client order to database.' });
  }
}
