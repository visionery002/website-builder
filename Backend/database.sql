
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

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255),
    status VARCHAR(50) DEFAULT 'discovery',
    stage_notes TEXT,
    launch_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS milestones (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    label VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE
);

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

CREATE TABLE IF NOT EXISTS updates (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    body TEXT,
    from_agency BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
