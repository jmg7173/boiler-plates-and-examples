from typing import Union, Tuple

from flask import (
    Blueprint,
    jsonify,
    request,
    Response,
)
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db
from models import User

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
    username = get_jwt_identity()
    user = User.query.filter_by(id=id).first()
    if user.username != username:
        return jsonify(message="Not updatable other user's profile!"), 401

    data = request.get_json()
    profile_img = data.get('profileImg')
    if profile_img:
        user.set_profile_img(username, profile_img)

    password = data.get('password')
    if password:
        user.set_password(password)

    email = data.get('email')
    if email:
        user.email = email

    db.session.commit()

    return jsonify(message='Successfully updated your profile!')
