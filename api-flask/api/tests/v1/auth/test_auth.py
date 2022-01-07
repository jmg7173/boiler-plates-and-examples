def test_login(client, user):
    res = client.post('/v1/api/auth/login')
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    username = user.username
    password = 'test'
    wrong_password = 'wrongtest'
    res = client.post('/v1/api/auth/login', json={'username': username})
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    res = client.post('/v1/api/auth/login', json={'password': wrong_password})
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    res = client.post(
        '/v1/api/auth/login',
        json={'username': username, 'password': wrong_password}
    )
    assert res.status_code == 400
    assert res.json == {'message': 'Identification information is not correct'}

    res = client.post(
        '/v1/api/auth/login',
        json={'username': username, 'password': password}
    )
    assert res.status_code == 200


def test_logout(client, user):
    username = user.username
    password = 'test'
    res = client.post(
        '/v1/api/auth/login',
        json={'username': username, 'password': password}
    )
    headers = {
        'Authorization': f'Bearer {res.json["access_token"]}',
        'Content-Type': 'application/json',
    }

    res = client.get('/v1/api/auth/me', headers=headers)
    assert res.json['username'] == username
    assert res.status_code == 200

    res = client.post('/v1/api/auth/logout', headers=headers)
    assert res.status_code == 200

    res = client.get('/v1/api/auth/me', headers=headers)
    assert res.status_code == 401
