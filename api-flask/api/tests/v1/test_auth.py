from models import User


def test_signup(client, database):
    # Invalid signup data cases
    res = client.post('/v1/api/auth/signup')
    assert res.status_code == 400

    res = client.post('/v1/api/auth/signup', json={'username': 'test'})
    assert res.status_code == 400

    res = client.post(
        '/v1/api/auth/signup',
        json={'email': 'test@test.com'},
    )
    assert res.status_code == 400

    res = client.post(
        '/v1/api/auth/signup',
        json={'password': 'test'},
    )
    assert res.status_code == 400

    res = client.post(
        '/v1/api/auth/signup',
        json={'username': 'test', 'email': 'test@test.com'},
    )
    assert res.status_code == 400

    res = client.post(
        '/v1/api/auth/signup',
        json={'username': 'test', 'password': 'test'},
    )
    assert res.status_code == 400

    res = client.post(
        '/v1/api/auth/signup',
        json={'email': 'test@test.com', 'password': 'test'},
    )
    assert res.status_code == 400

    # valid signup data case
    user_dict = {
        'username': 'test',
        'email': 'test@test.com',
        'password': 'test',
    }
    res = client.post('/v1/api/auth/signup', json=user_dict)
    assert res.status_code == 200

    user = User.query.filter_by(
        username=user_dict['username'],
        email=user_dict['email']
    ).first()
    assert user

    # duplicated user signup
    res = client.post('/v1/api/auth/signup', json=user_dict)
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Already exist username!',
            'email': 'Already exist email!',
        }
    }
