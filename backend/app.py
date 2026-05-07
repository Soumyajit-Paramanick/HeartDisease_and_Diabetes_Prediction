from flask import Flask
from flask_cors import CORS

from config import Config

from utils.download_models import download_models
from utils.db import db

# Download models before importing routes
download_models()

from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

# Initialize database
db.init_app(app)

# Create tables automatically
with app.app_context():
    db.create_all()

# Register routes
app.register_blueprint(heart_bp)
app.register_blueprint(diabetes_bp)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)