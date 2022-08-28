def test_login(client, user):
    res = client.post('/api/v1/auth/login')
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    username = user.username
    password = 'test'
    wrong_password = 'wrongtest'
    res = client.post('/api/v1/auth/login', json={'username': username})
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    res = client.post('/api/v1/auth/login', json={'password': wrong_password})
    assert res.status_code == 400
    assert res.json == {'message': 'Please put both username and password'}

    res = client.post(
        '/api/v1/auth/login',
        json={'username': username, 'password': wrong_password}
    )
    assert res.status_code == 400
    assert res.json == {'message': 'Identification information is not correct'}

    res = client.post(
        '/api/v1/auth/login',
        json={'username': username, 'password': password}
    )
    assert res.status_code == 200


def test_logout(client, user):
    username = user.username
    password = 'test'
    res = client.post(
        '/api/v1/auth/login',
        json={'username': username, 'password': password}
    )
    headers = {
        'Authorization': f'Bearer {res.json["access_token"]}',
        'Content-Type': 'application/json',
    }

    res = client.get('/api/v1/auth/me', headers=headers)
    assert res.json['username'] == username
    assert res.status_code == 200

    res = client.post('/api/v1/auth/logout', headers=headers)
    assert res.status_code == 200

    res = client.get('/api/v1/auth/me', headers=headers)
    assert res.status_code == 401
