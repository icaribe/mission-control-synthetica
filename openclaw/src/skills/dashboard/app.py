import os
import json
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler

HOST = "0.0.0.0"
# Railway provides the port via the PORT environment variable; fallback to 5000.
PORT = int(os.getenv("PORT", "5000"))

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Health check endpoint
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode())
            return

        # API endpoint to serve tasks data
        if self.path == "/tasks":
            tasks_path = "/data/workspace/memory/tasks.json"
            with open(tasks_path, "r", encoding="utf-8") as f:
                tasks_data = json.load(f)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(tasks_data).encode())
            return

        # Map request path to a file in the current directory (dashboard)
        if self.path == "/":
            file_path = os.path.join(os.getcwd(), "index.html")
        else:
            file_path = os.path.join(os.getcwd(), self.path.strip("/"))
        
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