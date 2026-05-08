from flask import Flask
from flask_cors import CORS

from config import Config

from utils.db import db

from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp
from routes.auth_routes import auth_bp
from routes.health_routes import health_bp

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
app.register_blueprint(health_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)