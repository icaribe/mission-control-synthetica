# AgentMail Skill

Plan to integrate AgentMail inbox reading/sending into OpenClaw as a skill.

What it does:
- Read emails from AgentMail inbox (secured API key stored separately)
- Send emails via AgentMail
- Basic templates for composing replies from inbox content

Security notes:
- The AgentMail API key is stored securely (not logged)
- No raw credentials are printed

Usage:
- Invoke the skill via the agent/skill interface (see OpenClaw skill registry)
- Provide inbox criteria (e.g., read last N emails) and compose replies accordingly
