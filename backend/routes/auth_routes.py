from flask import Blueprint, request, jsonify
from utils.db import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

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

        hashed_password = generate_password_hash(password)

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        """, (name, email, hashed_password))

        conn.commit()
        conn.close()

        print(f"NEW USER REGISTERED → {email}")

        return jsonify({
            "message": "Registration successful"
        })

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

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM users
            WHERE email = ?
        """, (email,))

        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({
                "error": "User not found"
            }), 404

        if not check_password_hash(
            user["password"],
            password
        ):
            return jsonify({
                "error": "Invalid password"
            }), 401

        # PRINT WHO LOGGED IN
        print(f"USER LOGGED IN → {user['name']} ({user['email']})")

        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500