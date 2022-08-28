from models import User


def test_signup(client, database):
    # Invalid signup data cases
    res = client.post('/api/v1/auth/signup')
    assert res.status_code == 400
    assert res.json == {'validation': 'Empty signup data!'}

    res = client.post('/api/v1/auth/signup', json={})
    assert res.status_code == 400
    assert res.json == {'validation': 'Empty signup data!'}

    res = client.post('/api/v1/auth/signup', json={'username': 'test'})
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': '',
            'email': 'Empty email field!',
            'password': 'Empty password field!',
        },
    }

    res = client.post('/api/v1/auth/signup', json={'email': 'test@test.com'})
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Empty username field!',
            'email': '',
            'password': 'Empty password field!',
        },
    }

    res = client.post('/api/v1/auth/signup', json={'password': 'test'})
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Empty username field!',
            'email': 'Empty email field!',
            'password': '',
        },
    }

    res = client.post(
        '/api/v1/auth/signup',
        json={'username': 'test', 'email': 'test@test.com'},
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': '',
            'email': '',
            'password': 'Empty password field!',
        },
    }

    res = client.post(
        '/api/v1/auth/signup',
        json={'username': 'test', 'password': 'test'},
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': '',
            'email': 'Empty email field!',
            'password': '',
        },
    }

    res = client.post(
        '/api/v1/auth/signup',
        json={'email': 'test@test.com', 'password': 'test'},
    )
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Empty username field!',
            'email': '',
            'password': '',
        },
    }

    # valid signup data case
    user_dict = {
        'username': 'test',
        'email': 'test@test.com',
        'password': 'test',
    }
    res = client.post('/api/v1/auth/signup', json=user_dict)
    assert res.status_code == 200

    user = User.query.filter_by(
        username=user_dict['username'],
        email=user_dict['email']
    ).first()
    assert user

    # duplicated user signup
    res = client.post('/api/v1/auth/signup', json=user_dict)
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Already exist username!',
            'email': 'Already exist email!',
        },
    }

    dup_user_dict = user_dict.copy()
    dup_user_dict['email'] = 'test2@test.com'
    res = client.post('/api/v1/auth/signup', json=dup_user_dict)
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'username': 'Already exist username!',
        },
    }

    dup_user_dict['email'] = 'test@test.com'
    dup_user_dict['username'] = 'test2'
    res = client.post('/api/v1/auth/signup', json=dup_user_dict)
    assert res.status_code == 400
    assert res.json == {
        'validation': {
            'email': 'Already exist email!',
        },
    }
