import os
import shutil

import pytest

if os.environ.get('IS_LOCAL'):
    from dotenv import load_dotenv

    load_dotenv('.env.local.test')

from app import create_app
from config import Config, get_config
from models import db, User

config: Config = get_config(os.environ.get('APP_MODE'))


@pytest.fixture
def app():
    app = create_app(config)

    return app


@pytest.fixture(scope='function')
def database(app):
    with app.app_context():
        db.drop_all()
        shutil.rmtree(config.VOLUME_PATH / 'images' / 'profile', ignore_errors=True)
        db.create_all()

    yield db


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture(scope='function')
def profile_image(request):
    shutil.rmtree(config.VOLUME_PATH / 'images' / 'profile', ignore_errors=True)

    def teardown():
        shutil.rmtree(config.VOLUME_PATH / 'images' / 'profile', ignore_errors=True)

    request.addfinalizer(teardown)


@pytest.fixture(scope='function')
def user(database):
    email = 'test@test.com'
    username = 'test'
    password = 'test'
    user = User(
        username=username,
        email=email,
    )
    user.set_password(password)
    database.session.add(user)
    database.session.commit()

    return user
