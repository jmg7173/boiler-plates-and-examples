from typing import Tuple

from flask import Blueprint, jsonify, Response

from v1.views import (
    auth_api,
    users_api,
)

api = Blueprint('v1', __name__, url_prefix='/api/v1')
api.register_blueprint(auth_api)
api.register_blueprint(users_api)


@api.get('/')
def api_v1() -> Tuple[Response, int]:
    return jsonify({'message': 'api v1'}), 200
