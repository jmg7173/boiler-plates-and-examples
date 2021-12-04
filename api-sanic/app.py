from sanic import Sanic
from sanic.response import text


app = Sanic('App')


@app.get("/")
async def hello_world(request):
    return text('Hello, world.')


if __name__ == '__main__':
    app.go_fast(host='0.0.0.0')

