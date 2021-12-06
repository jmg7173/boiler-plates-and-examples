import os

from dotenv import load_dotenv

load_dotenv('.env.local')

from app import create_app
from config import get_config

app = create_app(get_config(os.environ.get('APP_MODE')))

import models
