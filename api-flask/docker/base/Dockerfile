FROM python:3.10.0

RUN apt-get update && \
    apt-get -y --no-install-recommends install \
    ca-certificates \
    vim

RUN pip3 install --upgrade pip

WORKDIR /opt/install
COPY requirements.txt /opt/install/requirements.txt
RUN pip3 install -r requirements.txt

ENV PYTHONPATH='/opt/app/api'
ENV PYTHONIOENCODING='utf-8'
WORKDIR /opt/app/api

EXPOSE 5000
