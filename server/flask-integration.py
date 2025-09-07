from flask import Flask, render_template, request, redirect, jsonify
try:
    from replit import db
    USE_REPLIT_DB = True
except ImportError:
    USE_REPLIT_DB = False
    # Fallback to in-memory storage
    db_storage = {}

import os
import json
import datetime

app = Flask(__name__)

def get_db():
    """Get database instance - Replit DB or fallback storage"""
    if USE_REPLIT_DB:
        return db
    return db_storage

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400
            
        database = get_db()
        
        # Check if email already exists
        if USE_REPLIT_DB:
            if database.get(email):
                return jsonify({'error': 'Email already registered'}), 400
            database[email] = {'email': email, 'password': password}  # Use bcrypt in production
        else:
            if email in database:
                return jsonify({'error': 'Email already registered'}), 400
            database[email] = {'email': email, 'password': password}
            
        return jsonify({'message': 'Registration successful'}), 200
    return render_template('index.html')

@app.route('/api/join', methods=['POST'])
def api_join():
    """Enhanced API endpoint for React frontend"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')
    
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    
    database = get_db()
    
    # Check for existing registration
    if USE_REPLIT_DB:
        if database.get(f"user:{email}"):
            return jsonify({'error': 'Email already registered'}), 400
        user_data = {
            'email': email,
            'password': password,  # Use bcrypt in production
            'name': name,
            'timestamp': str(datetime.datetime.now()),
            'status': 'active'
        }
        database[f"user:{email}"] = user_data
    else:
        if f"user:{email}" in database:
            return jsonify({'error': 'Email already registered'}), 400
        user_data = {
            'email': email,
            'password': password,  # Use bcrypt in production
            'name': name,
            'timestamp': str(datetime.datetime.now()),
            'status': 'active'
        }
        database[f"user:{email}"] = user_data
    
    return jsonify({
        'success': True,
        'message': 'Successfully joined the Gentlemen Club!',
        'data': {
            'email': email,
            'name': name,
            'timestamp': user_data['timestamp']
        }
    })

@app.route('/api/join-requests')
def get_join_requests():
    """Get all join requests for admin dashboard"""
    return jsonify({
        'total': len(join_requests),
        'requests': join_requests
    })

@app.route('/thank-you')
def thank_you():
    return """
    <html>
    <head>
        <title>Thank You - Gentlemen Club</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-dark text-white">
        <div class="container text-center py-5">
            <i class="fas fa-crown fa-4x text-warning mb-4"></i>
            <h1 class="display-4 mb-4">Thank You for Joining!</h1>
            <p class="lead">Welcome to the exclusive Gentlemen's Club community.</p>
            <a href="/" class="btn btn-warning btn-lg mt-3">
                <i class="fas fa-home me-2"></i>
                Return to Home
            </a>
        </div>
    </body>
    </html>
    """

if __name__ == '__main__':
    import datetime
    app.run(host='0.0.0.0', port=8080, debug=True)