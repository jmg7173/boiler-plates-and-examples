import os

import redis
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required, get_jwt, get_jwt_identity,
)

from config import Config, get_config
from models import User

auth_api = Blueprint('auth', __name__, url_prefix='/auth')

config: Config = get_config(os.environ.get('APP_MODE'))
RedisSession = redis.StrictRedis(
    host=config.REDIS_HOSTNAME,
    port=config.REDIS_PORT,
    db=0,
)


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
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    RedisSession.set(jti, "", ex=config.JWT_ACCESS_TOKEN_EXPIRES)
    return jsonify(message='Access token revoked')


@auth_api.get('/me')
@jwt_required()
def me():
    return jsonify(user=get_jwt_identity())


@auth_api.post('/signup')
def signup():
    pass
