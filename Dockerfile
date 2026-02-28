# Dockerfile – minimal container for the Mission Control dashboard
FROM python:3.11-slim

# Install build dependencies for psycopg2
RUN apt-get update && apt-get install -y gcc python3-dev libpq-dev && rm -rf /var/lib/apt/lists/*

# Set a non‑root user (optional but recommended)
RUN useradd -m appuser
WORKDIR /app
COPY openclaw/src/skills/dashboard /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Switch to the app user
USER appuser

# Expose the port the dashboard runs on (PORT env var provided by Railway, fallback 5000)
EXPOSE ${PORT:-5000}

# Run the dashboard
CMD ["python", "app.py"]