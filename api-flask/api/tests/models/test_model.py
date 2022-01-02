from models import User


def test__create_user(database):
    email = 'test@test.com'
    username = 'test'
    user = User(
        username=username,
        email=email,
    )
    database.session.add(user)
    database.session.commit()

    user = User.query.first()

    assert user.email == email
