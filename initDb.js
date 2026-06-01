import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not set in your .env file.');
  process.exit(1);
}

// Create a connection pool using your Supabase connection string
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for secure Supabase SSL connections
  }
});

const setupDatabase = async () => {
  const sql = `
    -- 1. Create the custom enum type if it doesn't exist
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'business_category') THEN
            CREATE TYPE business_category AS ENUM (
                'business_website',
                'e-commerce_store',
                'brand_identity',
                'business_jumpstart_package',
                'mobile_application',
                'desktop_software',
                'telebirr_miniapp',
                'tiktok_store',
                'telegram_bot',
                'digital_payment',
                'custom_works'
            );
        END IF;
    END $$;

    -- 2. Create the clients table using the enum
    CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        business_name VARCHAR(255),
        phone_number VARCHAR(50),
        gmail VARCHAR(255),
        telegram_username VARCHAR(100),
        category business_category NOT NULL,
        business_info TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log("Connecting to Supabase and running setup SQL...");
    await pool.query(sql);
    console.log("Database table and types created successfully! 🎉");
  } catch (err) {
    console.error("❌ Error setting up database:", err.message);
  } finally {
    await pool.end();
  }
};

setupDatabase();
