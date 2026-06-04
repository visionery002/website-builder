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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { projectId, body } = req.body;

    if (!projectId || !body) {
      return res.status(400).json({ error: 'projectId and body are required' });
    }

    const result = await pool.query(
      'INSERT INTO updates (project_id, body, from_agency) VALUES ($1, $2, $3) RETURNING *',
      [projectId, body, false]
    );

    return res.status(201).json({ message: result.rows[0] });
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
