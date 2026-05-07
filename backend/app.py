from flask import Flask
from flask_cors import CORS

from utils.download_models import download_models
from utils.db import create_users_table

# Download models before importing routes
download_models()

from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)
CORS(app)

# Create users table automatically
create_users_table()

# Register all routes
app.register_blueprint(heart_bp)
app.register_blueprint(diabetes_bp)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)