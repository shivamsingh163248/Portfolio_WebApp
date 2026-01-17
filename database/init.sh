#!/bin/bash
# Database initialization script
# This script runs when PostgreSQL container starts

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create schema
    \i /docker-entrypoint-initdb.d/schema.sql
    
    -- Seed data
    \i /docker-entrypoint-initdb.d/seed_data.sql
    
    -- Grant permissions
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_USER;
EOSQL

echo "Database initialization completed successfully!"
