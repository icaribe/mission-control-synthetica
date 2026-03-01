# MEMORY.md - Durable Memories (as of 2026-03-01)

## Project Overview
- Developed Mission Control dashboard with Kanban, Memory Library, Team Structure, and Digital Office.
- Integrated Basic Auth using environment variables `TASK_USER` / `TASK_PASS`.
- Deployed via Railway with persistent environment variables.

## Mission Control Dashboard
- Central web interface that unifies Kanban boards, Memory Library, Team Structure, and Digital Office.
- Secured with Basic Auth; credentials are stored in environment variables `TASK_USER` and `TASK_PASS`.
- Hosted on Railway; publicly reachable at `https://mission-control-synthetica-production.up.railway.app` (exposed via localtunnel).
- Features:
  - Real‑time task board with drag‑and‑drop columns.
  - Integrated memory repository for quick access to stored notes and resources.
  - Team overview showing roles, responsibilities, and contact status.
  - Digital office widgets for scheduling, file sharing, and notifications.
- Planned enhancements: CI/CD pipeline integration, UI/UX refinements, and richer authentication options.

## Skills & Tools
- Created `conway-setup` skill for wallet creation, SIWE, MCP registration.
- Built PDF workflow skill using `fpdf2` / `WeasyPrint`.
- Implemented email manager skill to monitor the assistant's AgentMail inbox (this is the assistant's mailbox, not the user's).
- Added audio-sender skill for TTS output.

## Cron & Automation
- Set up daily cron `daily_concurso_search` for public contests in Bahia.
- Spawned sub-agent `subagent_concurso_search` for periodic contest scraping.

## Recent Actions (2026-03-01)
- Integrated CI/CD pipeline with GitHub Actions (workflow located at `.github/workflows/ci.yml`).
- Published latest MEMORY.md updates to the repository.
- Refined dashboard UI/UX, enhancing Kanban fluidity and agenda widget smoothness.
- Attempted MiniMax M2.1 CLI installation; binary not found; using API instead.

## Upcoming Tasks
- Continue refining dashboard UI/UX.
- Further integrate API access for MiniMax M2.1.
- Maintain memory sync and cron automation.

## Timezone Handling
- For time-related queries, respond with just the current time in the format "agora são HH:MM", using the user's local timezone (America/Sao_Paulo) but without explicitly mentioning it or the location.
- Do not reference the timezone, place, or any contextual location in the response.
- Record times in logs in UTC but store the user's preferred response format in MEMORY.md.