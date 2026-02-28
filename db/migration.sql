-- Migration script to create core tables for Mission Control

CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
    CONSTRAINT tasks_title_unique UNIQUE (title),
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL, -- e.g., planned, running, done, failed, blocked
    priority TEXT,        -- low, medium, high
    deadline TIMESTAMP WITH TIME ZONE,
    agent_owner INTEGER REFERENCES agents(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS task_events (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    agent_id INTEGER REFERENCES agents(id),
    event_type TEXT NOT NULL, -- e.g., task_created, task_started, task_step, task_done, task_failed, note
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS artifacts (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    type TEXT,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
