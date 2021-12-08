from flask import Blueprint

auth_api = Blueprint('auth', __name__, url_prefix='/auth')


@auth_api.post('/login')
def login():
    pass


@auth_api.post('/logout')
def logout():
    pass


@auth_api.post('/signup')
def signup():
    pass
