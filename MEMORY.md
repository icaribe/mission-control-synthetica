# MEMORY.md - Durable Memories (as of 2026-02-28)

## Project Overview
- Developed Mission Control dashboard with Kanban, Memory Library, Team Structure, and Digital Office.
- Integrated Basic Auth using environment variables `TASK_USER` / `TASK_PASS`.
- Deployed via Railway with persistent environment variables.

## Skills & Tools
- Created `conway-setup` skill for wallet creation, SIWE, MCP registration.
- Built PDF workflow skill using `fpdf2` / `WeasyPrint`.
- Implemented email manager skill to monitor AgentMail inbox.
- Added audio-sender skill for TTS output.

## Cron & Automation
- Set up daily cron `daily_concurso_search` for public contests in Bahia.
- Spawned sub-agent `subagent_concurso_search` for periodic contest scraping.

## Recent Actions (2026-02-28)
- Generated ebook `memory/top_100_museums_ebook.md` with placeholder images.
- Compiled museum list `memory/top_100_museums.md`.
- Created image of android self-reflection (PNG saved).
- Provided weather forecast for Xique-Xique, Bahia.
- Deployed dashboard publicly via localtunnel, URL: `https://deep-bugs-float.loca.lt`
- Added README, Dockerfile, CI workflow placeholders.

## Upcoming Tasks
- Integrate CI pipeline with GitHub.
- Push updated `MEMORY.md` to GitHub repository.
- Continue refining dashboard UI/UX.