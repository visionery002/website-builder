
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
