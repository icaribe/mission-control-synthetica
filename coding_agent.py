#!/usr/bin/env python3
"""
Wrapper around OpenAI's GPT-5-nano model (via OpenRouter) for code generation.
"""

import os
import sys
import json
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    print("Error: OPENROUTER_API_KEY not set in environment.", file=sys.stderr)
    sys.exit(1)

OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"

def generate_code(prompt: str, model: str = "openrouter/openai/gpt-5-nano:free"):
    """
    Sends a prompt to the GPT-5-nano model and returns the generated text.
    """
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 1024,
    }
    response = requests.post(OPENROUTER_ENDPOINT, headers=headers, json=payload)
    if response.status_code != 200:
        print(f"Error from OpenRouter: {response.status_code} {response.text}", file=sys.stderr)
        sys.exit(1)
    data = response.json()
    return data["choices"][0]["message"]["content"]

if __name__ == "__main__":
    if len(sys.argv) > 1:
        prompt = " ".join(sys.argv[1:])
    else:
        prompt = sys.stdin.read().strip()
    if not prompt:
        print("Usage: coding_agent.py <prompt>", file=sys.stderr)
        sys.exit(1)
    print(generate_code(prompt))