import os
import urllib.request
from hashlib import md5
from pathlib import Path

import redis
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required, get_jwt, get_jwt_identity,
)

from app import db
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
            profile_img_path=user.profile_img_path,
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
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    return jsonify(username=username, profile_img_path=user.profile_img_path)


@auth_api.post('/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'validation': {
            'username': '' if username else 'Empty username field!',
            'email': '' if email else 'Empty email field!',
            'password': '' if password else 'Empty password field!',
        }})

    user = User.query.filter_by(username=username).first()
    error_msg = {}
    if user:
        error_msg['username'] = 'Already exist username!'

    user = User.query.filter_by(email=email).first()
    if user:
        error_msg['email'] = 'Already exist email!'

    if error_msg:
        return jsonify({'validation': error_msg}), 400

    profile_img_base_dir = Path('images/profile')
    profile_img_dir = config.VOLUME_PATH / profile_img_base_dir
    profile_img_filename = f'{username}.png'
    profile_img_fullpath = profile_img_dir / profile_img_filename
    profile_img_request_path = profile_img_base_dir / profile_img_filename
    os.makedirs(profile_img_dir, exist_ok=True)
    digest = md5(username.encode('utf-8')).hexdigest()
    urllib.request.urlretrieve(
        f'https://www.gravatar.com/avatar/{digest}?d=identicon&s=200',
        profile_img_fullpath,
    )

    user = User(
        username=username,
        email=email,
        profile_img_path=profile_img_request_path,
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Successfully registered!'})
