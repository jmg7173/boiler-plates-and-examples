FROM python:3.10.6

RUN apt update
RUN apt install -y --no-install-recommends \
    curl \
    vim \
    libgdcm-tools

RUN pip install poetry==1.1.15
WORKDIR /opt/install
COPY pyproject.toml poetry.lock* ./

ENV PYTHONPATH='/opt/app/api'

RUN poetry config virtualenvs.create false
RUN poetry install

EXPOSE 8000
