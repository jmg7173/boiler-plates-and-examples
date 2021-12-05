from flask import Flask

from config import Config, get_config
from v1 import api as v1_api


def create_app(config: Config) -> Flask:
    app = Flask(config.APP_NAME)
    app.config.from_object(config)
    app.register_blueprint(v1_api)

    return app


if __name__ == '__main__':
    config: Config = get_config()
    app: Flask = create_app(config)
    app.run(host='0.0.0.0')
