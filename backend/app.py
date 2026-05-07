from flask import Flask
from flask_cors import CORS

from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp
from routes.auth_routes import auth_bp

from utils.db import create_users_table

app = Flask(__name__)
CORS(app)

# create users table automatically
create_users_table()

# register all routes
app.register_blueprint(heart_bp)
app.register_blueprint(diabetes_bp)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True)