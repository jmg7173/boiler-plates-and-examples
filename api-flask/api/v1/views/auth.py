from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token

from models import User

auth_api = Blueprint('auth', __name__, url_prefix='/auth')


@auth_api.post('/login')
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Please put both username and password'}), 400

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify(
            access_token=create_access_token(identity=username),
            refresh_token=create_refresh_token(identity=username),
        ), 200

    return jsonify({'message': 'Identification information is not correct'}), 400


@auth_api.post('/logout')
def logout():
    pass


@auth_api.post('/signup')
def signup():
    pass
