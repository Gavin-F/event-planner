#!/bin/bash

# Wait for the database to be ready
echo "⏳ Waiting for Postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "✅ Postgres is up!"

# Run migrations
flask db upgrade

# Start the app
exec flask run --host=0.0.0.0
