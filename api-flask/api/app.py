import os

from flask import Flask
from flask_jwt_extended import JWTManager

from config import Config, get_config

jwt = JWTManager()


def create_app(config: Config) -> Flask:
    app = Flask(config.APP_NAME)
    app.config.from_object(config)

    from v1 import api as v1_api

    app.register_blueprint(v1_api)

    from models import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)

    jwt.init_app(app)

    return app


if __name__ == '__main__':
    config: Config = get_config(os.environ.get('APP_MODE'))
    app: Flask = create_app(config)
    app.run(host='0.0.0.0', port=8000)
