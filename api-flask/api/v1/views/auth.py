from flask import Blueprint

user_api = Blueprint('auth', __name__, url_prefix='/user')


@user_api.post('/login')
def login(request):
    pass


@user_api.post('/logout')
def logout(request):
    pass


@user_api.post('/signup')
def signup(request):
    pass
