from typing import Union, Tuple

from flask import (
    Blueprint,
    jsonify,
    request,
    Response,
)
from flask_jwt_extended import jwt_required, get_jwt_identity

from models import User, db

users_api = Blueprint('users', __name__, url_prefix='/users')


@users_api.get('/')
def get_users() -> Response:
    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 10, type=int)
    data = User.to_collection_dict(User.query, page, page_size, request.endpoint)
    return jsonify(data)


@users_api.get('/<int:id>')
def get_user(id: int) -> Response:
    return jsonify(User.query.get_or_404(id).to_dict())


@users_api.put('/<int:id>')
@jwt_required()
def update_user(id: int) -> Union[Response, Tuple[Response, int]]:
    user_id = get_jwt_identity()
    if user_id != id:
        return jsonify(message="Not updatable other user's profile!"), 401

    data = request.get_json()
    user = User.query.filter_by(id=id).first()

    error = {}
    email = data.get('email')
    if email:
        email_exist_user = User.query.filter_by(email=email).first()
        if email_exist_user:
            error['email'] = 'Already exists email!'
        user.email = email

    username = data.get('username')
    if username:
        username_exist_user = User.query.filter_by(username=username).first()
        if username_exist_user:
            error['username'] = 'Already exists username!'
        user.username = username

    password = data.get('password')
    if password:
        user.set_password(password)

    profile_img_str = data.get('profileImg')
    if profile_img_str:
        profile_img_encoded = profile_img_str[profile_img_str.find(',')+1:]
        user.set_profile_img(user.username, profile_img_encoded)

    if error:
        return jsonify(validation=error), 400

    db.session.commit()

    return jsonify(message='Successfully updated your profile!')
