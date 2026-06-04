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

    -- 3. Create projects table
    CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        title VARCHAR(255),
        status VARCHAR(50) DEFAULT 'discovery',
        stage_notes TEXT,
        launch_date DATE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. Create milestones table
    CREATE TABLE IF NOT EXISTS milestones (
        id SERIAL PRIMARY KEY,
        project_id INT REFERENCES projects(id) ON DELETE CASCADE,
        label VARCHAR(255),
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE
    );

    -- 5. Create invoices table
    CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        amount NUMERIC(10,2),
        currency VARCHAR(10) DEFAULT 'ETB',
        status VARCHAR(30) DEFAULT 'unpaid',
        due_date DATE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- 6. Create updates table
    CREATE TABLE IF NOT EXISTS updates (
        id SERIAL PRIMARY KEY,
        project_id INT REFERENCES projects(id) ON DELETE CASCADE,
        body TEXT,
        from_agency BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- 7. Create requests table
    CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        client_id INT REFERENCES clients(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(30) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    -- 7. Seed test data if needed
    INSERT INTO clients (user_name, business_name, category, phone_number, gmail)
    VALUES
      ('Abebe Kebede', 'Kebede Construction', 'business_website', '+251911111111', 'abebe@example.com'),
      ('Test Client', 'Test Business', 'business_website', '+251922222222', 'test@test.com')
    ON CONFLICT DO NOTHING;

    INSERT INTO projects (client_id, title, status, stage_notes)
    VALUES
      (1, 'Kebede Construction Website', 'design', 'Currently designing the homepage and services page.'),
      (2, 'Test Business Website', 'development', 'Building the main site features right now.')
    ON CONFLICT DO NOTHING;

    INSERT INTO milestones (project_id, label, completed, due_date)
    VALUES
      (1, 'Homepage Design', true, CURRENT_DATE - INTERVAL '7 days'),
      (1, 'Services Page', false, CURRENT_DATE + INTERVAL '7 days'),
      (1, 'Contact Form Integration', false, CURRENT_DATE + INTERVAL '14 days'),
      (1, 'Launch', false, CURRENT_DATE + INTERVAL '21 days'),
      (2, 'Homepage Build', true, CURRENT_DATE - INTERVAL '5 days'),
      (2, 'About Page', true, CURRENT_DATE - INTERVAL '2 days'),
      (2, 'Services Page', false, CURRENT_DATE + INTERVAL '3 days'),
      (2, 'Testing & Launch', false, CURRENT_DATE + INTERVAL '10 days')
    ON CONFLICT DO NOTHING;

    INSERT INTO invoices (client_id, amount, currency, status, due_date, description)
    VALUES
      (1, 15000, 'ETB', 'unpaid', CURRENT_DATE + INTERVAL '7 days', '50% Deposit - Website Design'),
      (1, 15000, 'ETB', 'unpaid', CURRENT_DATE + INTERVAL '21 days', '50% Final - Development & Launch'),
      (2, 20000, 'ETB', 'paid', CURRENT_DATE - INTERVAL '10 days', '50% Deposit - Website Development'),
      (2, 20000, 'ETB', 'unpaid', CURRENT_DATE + INTERVAL '10 days', '50% Final - Testing & Launch')
    ON CONFLICT DO NOTHING;

    INSERT INTO updates (project_id, body, from_agency, created_at)
    VALUES
      (1, 'We have started the design phase. Homepage mockups will be ready by next week.', true, CURRENT_TIMESTAMP - INTERVAL '3 days'),
      (1, 'Please review the attached homepage design and provide feedback.', true, CURRENT_TIMESTAMP - INTERVAL '1 day'),
      (2, 'Your website development is progressing well. Homepage and about page are complete.', true, CURRENT_TIMESTAMP - INTERVAL '2 days'),
      (2, 'We are now building the services page. Should be ready by end of week.', true, CURRENT_TIMESTAMP - INTERVAL '12 hours'),
      (2, 'Great work on the feedback! We have made the requested changes.', true, CURRENT_TIMESTAMP - INTERVAL '6 hours')
    ON CONFLICT DO NOTHING;

    INSERT INTO requests (client_id, title, status, created_at)
    VALUES
      (1, 'Add a contact form to the homepage', 'in_progress', CURRENT_TIMESTAMP - INTERVAL '2 days'),
      (1, 'Fix mobile menu on iOS', 'completed', CURRENT_TIMESTAMP - INTERVAL '5 days'),
      (2, 'Update company logo', 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day')
    ON CONFLICT DO NOTHING;
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
