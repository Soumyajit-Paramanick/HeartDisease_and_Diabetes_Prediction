from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

from utils.db import db, User

auth_bp = Blueprint("auth_bp", __name__)


# REGISTER
@auth_bp.route("/api/register", methods=["POST"])
def register():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:

            return jsonify({
                "error": "All fields are required"
            }), 400

        # Check if user already exists
        existing_user = User.query.filter_by(email=email).first()

        if existing_user:

            return jsonify({
                "error": "Email already registered"
            }), 400

        # Hash password
        hashed_password = generate_password_hash(password)

        # Create new user
        new_user = User(
            name=name,
            email=email,
            password=hashed_password
        )

        # Save to database
        db.session.add(new_user)
        db.session.commit()

        print(f"NEW USER REGISTERED → {email}")

        return jsonify({
            "message": "Registration successful"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# LOGIN
@auth_bp.route("/api/login", methods=["POST"])
def login():

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        # Find user
        user = User.query.filter_by(email=email).first()

        if not user:

            return jsonify({
                "error": "User not found"
            }), 404

        # Check password
        if not check_password_hash(user.password, password):

            return jsonify({
                "error": "Invalid password"
            }), 401

        print(f"USER LOGGED IN → {user.name} ({user.email})")

        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user.name,
                "email": user.email
            }
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500