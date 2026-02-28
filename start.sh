#!/usr/bin/env bash
set -e

# Load environment variables from .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Required env vars
: "${SETUP_PASSWORD:?SETUP_PASSWORD must be set}"
: "${OPENCLAW_STATE_DIR:=/data/.openclaw}"
: "${OPENCLAW_WORKSPACE_DIR:=/data/workspace}"

# Run the non-interactive setup wizard to create state dirs and tokens
openclaw onboard --non-interactive --accept-risk \
  --workspace "$OPENCLAW_WORKSPACE_DIR" \
  --state "$OPENCLAW_STATE_DIR"

# Determine port: Railway sets $PORT, fallback to 8080
PORT=${PORT:-8080}

# Start the gateway with password authentication using the setup password
openclaw gateway --auth password --password "$SETUP_PASSWORD" --port "$PORT"