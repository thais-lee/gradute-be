# Set up postgres
## Create user
```sql
  CREATE USER graduate;
  ALTER USER graduate WITH SUPERUSER;
  ALTER USER graduate WITH PASSWORD 'graduate';
```