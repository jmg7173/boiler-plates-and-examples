import os
from typing import Union, Tuple

import redis
from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required, get_jwt, get_jwt_identity,
)

from app import jwt
from config import Config, get_config
from models import User, db

auth_api = Blueprint('auth', __name__, url_prefix='/auth')

config: Config = get_config(os.environ.get('APP_MODE'))
RedisSession = redis.StrictRedis(
    host=config.REDIS_HOSTNAME,
    port=config.REDIS_PORT,
    db=0,
)


@auth_api.post('/login')
def login() -> Tuple[Response, int]:
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Please put both username and password'}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Please put both username and password'}), 400

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify(
            access_token=create_access_token(identity=user.id),
            refresh_token=create_refresh_token(identity=user.id),
            user=user.to_dict(),
        ), 200

    return jsonify({'message': 'Identification information is not correct'}), 400


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return RedisSession.get(jti) is not None


@auth_api.post('/logout')
@jwt_required()
def logout() -> Response:
    jti = get_jwt()['jti']
    RedisSession.set(jti, "", ex=config.JWT_ACCESS_TOKEN_EXPIRES)
    return jsonify(message='Access token revoked')


@auth_api.get('/me')
@jwt_required()
def me() -> Response:
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.to_dict())


@auth_api.post('/signup')
def signup() -> Union[Response, Tuple[Response, int]]:
    data = request.get_json()
    if not data:
        return jsonify({'validation': 'Empty signup data!'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'validation': {
            'username': '' if username else 'Empty username field!',
            'email': '' if email else 'Empty email field!',
            'password': '' if password else 'Empty password field!',
        }}), 400

    user = User.query.filter_by(username=username).first()
    error_msg = {}
    if user:
        error_msg['username'] = 'Already exist username!'

    user = User.query.filter_by(email=email).first()
    if user:
        error_msg['email'] = 'Already exist email!'

    if error_msg:
        return jsonify({'validation': error_msg}), 400

    user = User(
        username=username,
        email=email,
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Successfully registered!'})
