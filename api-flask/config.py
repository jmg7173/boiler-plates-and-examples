from dataclasses import dataclass


@dataclass(frozen=True)
class Config:
    APP_NAME: str = 'app'
    TESTING: bool = False
    DEBUG: bool = False


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
    return CONFIG[env]
