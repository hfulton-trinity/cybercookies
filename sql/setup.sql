CREATE USER khardee WITH PASSWORD 'password';
CREATE DATABASE cybercookies WITH OWNER=khardee;
-- for having trouble dropping db
--   SELECT pg_terminate_backend(pg_stat_activity.pid)
--     FROM pg_stat_activity
--     WHERE pg_stat_activity.datname = 'cybercookies'
--       AND pid <> pg_backend_pid();