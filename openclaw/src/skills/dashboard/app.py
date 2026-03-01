import os
import json
import mimetypes
import psycopg2
import psycopg2.extras
from http.server import HTTPServer, BaseHTTPRequestHandler

HOST = "0.0.0.0"
# Railway provides the port via the PORT environment variable; fallback to 5000.
PORT = int(os.getenv("PORT", "5000"))

# Database connection (reuse across requests)
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable not set")

# Simple connection pool using psycopg2
conn = psycopg2.connect(DATABASE_URL)
conn.autocommit = True

class Handler(BaseHTTPRequestHandler):
    def _json_response(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode())

    def _fetch_tasks(self):
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            # Join agents to get the name for assigned_to
            cur.execute("""
                SELECT t.id, t.title, t.description, t.status, t.priority, t.deadline,
                       a.name AS assigned_to, t.created_at, t.updated_at
                FROM tasks t
                LEFT JOIN agents a ON t.agent_owner = a.id
                ORDER BY t.id
            """)
            tasks = cur.fetchall()
        return tasks

    def do_GET(self):
        # Health check endpoint
        if self.path == "/health":
            self._json_response({"status": "ok"})
            return

        # API endpoint to serve tasks data from DB
        if self.path == "/tasks":
            tasks = self._fetch_tasks()
            self._json_response({"tasks": tasks})
            return

        # API endpoint to serve memories data
        if self.path.startswith("/api/memories"):
            # Extract path part before any query string
            path_part = self.path.split('?', 1)[0]
            if path_part == "/api/memories":
                memories = []
                memory_dir = "/data/workspace/memory"
                if os.path.isdir(memory_dir):
                    for filename in os.listdir(memory_dir):
                        if filename.endswith(".md"):
                            with open(os.path.join(memory_dir, filename), "r", encoding="utf-8") as f:
                                content = f.read()
                            memories.append({"title": filename, "content": content})
                self._json_response({"memories": memories})
                return

        # Map request path to a file in the current directory (dashboard)
        base_dir = os.path.dirname(os.path.abspath(__file__))
        if self.path == "/":
            file_path = os.path.join(base_dir, "index.html")
        else:
            # Prevent directory traversal attacks
            safe_path = os.path.normpath(self.path).lstrip('/')
            file_path = os.path.join(base_dir, safe_path)
        
        if not os.path.isfile(file_path):
            self.send_response(404)
            self.end_headers()
            return

        # Guess MIME type
        ctype, _ = mimetypes.guess_type(file_path)
        if ctype is None:
            ctype = "application/octet-stream"

        # Serve the file
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.end_headers()
        with open(file_path, "rb") as f:
            self.wfile.write(f.read())

if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), Handler)
    server.serve_forever()