-- Create the test database
CREATE DATABASE fox_shop_test;

-- Connect to the main database
\c fox_shop;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant necessary permissions for main database
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres;

-- Connect to the test database
\c fox_shop_test;

-- Enable required extensions for test database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant necessary permissions for test database
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA public TO postgres; 