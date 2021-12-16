import os
from dataclasses import dataclass
from datetime import timedelta


@dataclass(frozen=True)
class Config:
    APP_NAME: str = 'app'
    JWT_SECRET_KEY: str = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.environ.get('JWT_ACCESS_EXPIRES', 1440)))
    TESTING: bool = False
    DEBUG: bool = False

    # DB configuration
    SQLALCHEMY_DATABASE_URI: str = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
        os.environ.get('POSTGRESQL_USER'),
        os.environ.get('POSTGRESQL_PASSWORD'),
        os.environ.get('POSTGRESQL_HOSTNAME'),
        os.environ.get('POSTGRESQL_PORT'),
        os.environ.get('POSTGRESQL_DATABASE_NAME'),
    )
    SQLALCHEMY_TRACK_MODIFICATIONS: int = 1

    REDIS_HOSTNAME: str = os.environ.get('REDIS_HOSTNAME')
    REDIS_PORT: int = os.environ.get('REDIS_PORT')


@dataclass(frozen=True)
class DevConfig(Config):
    DEBUG: bool = True


@dataclass(frozen=True)
class TestConfig(Config):
    APP_NAME: str = 'test-app'
    TESTING: bool = True


CONFIG = {
    'prod': Config,
    'dev': DevConfig,
    'test': TestConfig,
}


def get_config(env: str = 'prod') -> Config:
    if not env:
        env = 'prod'
    return CONFIG[env]
