import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verify endpoint - find client by email or phone
    if (req.method === 'GET' && req.url.includes('/verify')) {
      const { email, phone } = req.query;

      if (!email && !phone) {
        return res.status(400).json({ error: 'email or phone is required' });
      }

      // Search for client by email first, then by phone
      let clientRes = null;
      if (email && email.trim()) {
        clientRes = await pool.query('SELECT * FROM clients WHERE gmail = $1 OR user_name ILIKE $2', [email, `%${email}%`]);
      }

      if ((!clientRes || clientRes.rows.length === 0) && phone && phone.trim()) {
        clientRes = await pool.query('SELECT * FROM clients WHERE phone_number = $1 OR telegram_username = $2', [phone, phone.replace('@', '')]);
      }

      if (!clientRes || clientRes.rows.length === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const client = clientRes.rows[0];
      return res.status(200).json({ client });
    }

    // Dashboard data endpoint
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: 'clientId is required' });
    }

    if (req.method === 'GET') {
      // Fetch complete dashboard data for a client
      const clientRes = await pool.query('SELECT * FROM clients WHERE id = $1', [clientId]);
      if (clientRes.rows.length === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }

      const client = clientRes.rows[0];

      // Get project
      const projectRes = await pool.query('SELECT * FROM projects WHERE client_id = $1 LIMIT 1', [clientId]);
      const project = projectRes.rows[0] || null;

      let milestones = [];
      let updates = [];
      if (project) {
        const milestonesRes = await pool.query(
          'SELECT * FROM milestones WHERE project_id = $1 ORDER BY due_date ASC',
          [project.id]
        );
        milestones = milestonesRes.rows;

        const updatesRes = await pool.query(
          'SELECT * FROM updates WHERE project_id = $1 ORDER BY created_at DESC',
          [project.id]
        );
        updates = updatesRes.rows;
      }

      // Get invoices
      const invoicesRes = await pool.query(
        'SELECT * FROM invoices WHERE client_id = $1 ORDER BY created_at DESC',
        [clientId]
      );
      const invoices = invoicesRes.rows;

      return res.status(200).json({
        client,
        project,
        milestones,
        invoices,
        updates,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return res.status(500).json({ error: error.message });
  }
}
