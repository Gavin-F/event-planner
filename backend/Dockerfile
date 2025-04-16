# Use an official Python runtime
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system deps + Python packages
COPY requirements.txt .
RUN apt-get update && apt-get install -y netcat-openbsd && pip install --upgrade pip && pip install -r requirements.txt

# Copy project files
COPY . .

# Add entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
