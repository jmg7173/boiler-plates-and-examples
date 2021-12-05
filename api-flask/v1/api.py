from flask import Blueprint

from v1.views import user_api

api = Blueprint('v1', __name__, url_prefix='/api')
api.register_blueprint(user_api)
