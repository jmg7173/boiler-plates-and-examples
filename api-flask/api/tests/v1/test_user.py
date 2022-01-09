import base64

from models import User


def test_users(client, user):
    res = client.get('/v1/api/users/')
    data = res.json
    assert res.status_code == 200
    assert len(data['items']) == 1


def test_get_user(client, user):
    res = client.get('/v1/api/users/2')
    assert res.status_code == 404

    res = client.get('/v1/api/users/1')
    assert res.status_code == 200
    assert res.json == user.to_dict()


def test_update_user(app, client, database, user):
    user2 = User(username='test2', email='test2@test.com')
    user2.set_password('test2')
    database.session.add(user2)
    database.session.commit()

    res = client.put('/v1/api/users/2')
    assert res.status_code == 401

    res = client.post(
        '/v1/api/auth/login',
        json={
            'username': 'test2',
            'password': 'test2',
        }
    )
    headers = {
        'Authorization': f'Bearer {res.json["access_token"]}',
        'Content-Type': 'application/json',
    }

    res = client.put('/v1/api/users/1', headers=headers)
    assert res.status_code == 401
    assert res.json['message'] == "Not updatable other user's profile!"

    res = client.put('/v1/api/users/2', headers=headers)
    assert res.status_code == 200
    assert res.json['message'] == 'No changes requested'

    # Update with existing username / email
    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'username': 'test'}
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {'username': 'Already exists username!'}
    }
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.to_dict() == user2.to_dict()

    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'email': 'test@test.com'}
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {'email': 'Already exists email!'}
    }
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.to_dict() == user2.to_dict()

    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'username': 'test', 'email': 'test@test.com'}
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Already exists username!',
            'email': 'Already exists email!',
        }
    }
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.to_dict() == user2.to_dict()

    # Update profile image
    with open('tests/profile_images/new.png', 'rb') as f:
        new_profile_img_binary = f.read()
    encoded_new_img = base64.b64encode(new_profile_img_binary)

    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={
            'profileImg': str(encoded_new_img)[2:-1],
        }
    )
    assert res.status_code == 200

    user2 = User.query.filter_by(username='test2').first()
    with open(app.config['VOLUME_PATH'] / user2.profile_img_path, 'rb') as f:
        updated_profile_img_binary = f.read()

    assert new_profile_img_binary == updated_profile_img_binary

    # Update profile
    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'username': 'test3'}
    )
    assert res.status_code == 200
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.username == 'test3'

    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'email': 'test3@test.com'}
    )
    assert res.status_code == 200
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.email == 'test3@test.com'

    res = client.put(
        '/v1/api/users/2',
        headers=headers,
        json={'password': 'test3'}
    )
    assert res.status_code == 200
    updated_user = User.query.filter_by(id=2).first()
    assert updated_user.check_password('test3')
