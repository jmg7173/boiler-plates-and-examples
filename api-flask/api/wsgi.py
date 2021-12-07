import os

from flask import Flask

from app import create_app
from config import Config, get_config

config: Config = get_config(os.environ.get('APP_MODE'))
app: Flask = create_app(config)
