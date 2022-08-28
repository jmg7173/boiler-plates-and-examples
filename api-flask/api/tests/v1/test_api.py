import json


def test_api(client):
    response = client.get('/api/v1/')
    assert response.status_code == 200
    assert json.loads(response.data) == {'message': 'api v1'}
