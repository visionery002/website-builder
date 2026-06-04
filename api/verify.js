import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input } = req.query;

    if (!input || !input.trim()) {
      return res.status(400).json({ error: 'Email or phone is required' });
    }

    const searchTerm = input.trim();

    // Search for client by email or phone
    const clientRes = await pool.query(
      `SELECT * FROM clients
       WHERE gmail = $1
       OR phone_number = $2
       OR user_name ILIKE $3
       LIMIT 1`,
      [searchTerm, searchTerm, `%${searchTerm}%`]
    );

    if (clientRes.rows.length === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const client = clientRes.rows[0];
    return res.status(200).json({ client });
  } catch (error) {
    console.error('Verify API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
