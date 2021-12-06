import os

from dotenv import load_dotenv

from app import create_app
from config import get_config

load_dotenv('.env.local')
app = create_app(get_config(os.environ.get('APP_MODE')))

import models
