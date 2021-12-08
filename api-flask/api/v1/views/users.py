from flask import (
    Blueprint,
    jsonify,
    request,
    Response,
)

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
