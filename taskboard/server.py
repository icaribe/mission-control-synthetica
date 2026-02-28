import os
from flask import Flask, request, Response, send_from_directory

app = Flask(__name__)

USERNAME = os.getenv('TASK_USER')
PASSWORD = os.getenv('TASK_PASS')

# Memory API
import json, glob

def check_auth(username, password):
    return username == USERNAME and password == PASSWORD

def authenticate():
    return Response(
        'Authentication required', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'}
    )

@app.before_request
def require_auth():
    auth = request.authorization
    if not auth or not check_auth(auth.username, auth.password):
        return authenticate()

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/tasks')
def tasks_page():
    return send_from_directory('static', 'index.html')

@app.route('/team')
def team_page():
    return send_from_directory('static', 'team.html')

# Memory routes
import json, glob

@app.route('/api/memories')
def api_memories():
    query = request.args.get('q', '').lower()
    files = glob.glob('/data/workspace/memory/*.md')
    results = []
    for f in files:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        title = f.split('/')[-1]
        if query and query not in content.lower() and query not in title.lower():
            continue
        results.append({'title': title, 'content': content})
    return {'memories': results}

@app.route('/memories')
def memories_page():
    return send_from_directory('static', 'memory.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 8080)))
