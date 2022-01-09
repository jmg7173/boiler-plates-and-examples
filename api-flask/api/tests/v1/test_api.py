import json


def test_api(client):
    response = client.get('/v1/api/')
    assert response.status_code == 200
    assert json.loads(response.data) == {'message': 'api v1'}
