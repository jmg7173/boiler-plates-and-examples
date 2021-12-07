from flask import Blueprint, jsonify

from v1.views import user_api

api = Blueprint('v1', __name__, url_prefix='/v1/api')
api.register_blueprint(user_api)


@api.get('/')
def api_v1():
    return jsonify({'message': 'api v1'}), 200
