import base64
import os

from models import User


def test_create_user(database):
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


def test_user_dict(database):
    email = 'test@test.com'
    username = 'test'
    user = User(
        username=username,
        email=email,
    )
    database.session.add(user)
    database.session.commit()

    assert user.to_dict() == {
        'id': user.id,
        'username': username,
        'email': email,
        'created_at': user.created_at.strftime('%Y-%m-%dT%H:%M:%S'),
        'profile_img_path': user.profile_img_path,
        '_links': {
            'self': f'/v1/api/users/{user.id}'
        }
    }


def test_user_password():
    email = 'test@test.com'
    username = 'test'
    password = 'Test@1234!'
    wrong_password = 'Test@123!'
    user = User(
        username=username,
        email=email,
    )
    user.set_password(password)
    assert user.check_password(password)
    assert not user.check_password(wrong_password)


def test_user_profile_image(app, profile_image):
    email = 'test@test.com'
    username = 'test'
    user = User(
        username=username,
        email=email,
    )
    with open(app.config['VOLUME_PATH'] / user.profile_img_path, 'rb') as f:
        original_profile_img_binary = f.read()

    with open('tests/profile_images/default.png', 'rb') as f:
        default_profile_img_binary = f.read()

    assert default_profile_img_binary == original_profile_img_binary

    # Update profile image
    with open('tests/profile_images/new.png', 'rb') as f:
        new_profile_img_binary = f.read()

    encoded_new_img = base64.b64encode(new_profile_img_binary)
    user.set_profile_img(username, encoded_img=encoded_new_img)

    with open(app.config['VOLUME_PATH'] / user.profile_img_path, 'rb') as f:
        updated_profile_img_binary = f.read()

    assert updated_profile_img_binary == new_profile_img_binary
    assert len(os.listdir(app.config['VOLUME_PATH'] / 'images/profile')) == 1
