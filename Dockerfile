# Dockerfile – minimal container for the Mission Control dashboard
FROM python:3.11-slim

# Set a non‑root user (optional but recommended)
RUN useradd -m appuser
WORKDIR /app
COPY openclaw/src/skills/dashboard /app

# Switch to the app user
USER appuser

# Expose the port the dashboard runs on
EXPOSE 5000

# Run the dashboard
CMD ["python", "app.py"]