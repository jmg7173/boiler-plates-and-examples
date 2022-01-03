import base64
import os
import urllib.request
import uuid
from hashlib import md5
from pathlib import Path
from typing import Dict

from flask import url_for
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import check_password_hash, generate_password_hash

from config import Config, get_config

config: Config = get_config(os.environ.get('APP_MODE'))

db = SQLAlchemy()
migrate = Migrate()


class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, page_size, endpoint, **kwargs) -> Dict:
        resources = query.paginate(page, page_size, error_out=False)
        return {
            'items': [item.to_dict() for item in resources.items],
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total_pages': resources.pages,
                'total_items': resources.total,
            },
            '_links': {
                'self': url_for(endpoint, page=page, page_size=page_size, **kwargs),
                'next': (
                    url_for(endpoint, page=page + 1, page_size=page_size, **kwargs)
                    if resources.has_next
                    else None
                ),
                'prev': (
                    url_for(endpoint, page=page - 1, page_size=page_size, **kwargs)
                    if resources.has_prev
                    else None
                ),
            },
        }


class User(PaginatedAPIMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, server_default=func.now())
    profile_img_path = db.Column(db.String(150))

    def set_profile_img(self, username, encoded_img=None, is_default_img=False):
        profile_img_base_dir = Path('images/profile')
        profile_img_dir = config.VOLUME_PATH / profile_img_base_dir
        profile_img_filename = f'{username}_{uuid.uuid4().hex}.png'
        profile_img_fullpath = profile_img_dir / profile_img_filename
        profile_img_request_path = profile_img_base_dir / profile_img_filename
        os.makedirs(profile_img_dir, exist_ok=True)
        if is_default_img:
            digest = md5(username.encode('utf-8')).hexdigest()
            urllib.request.urlretrieve(
                f'https://www.gravatar.com/avatar/{digest}?d=identicon&s=200',
                profile_img_fullpath,
            )
        else:
            img = base64.b64decode(encoded_img)
            with open(profile_img_fullpath, 'wb') as f:
                f.write(img)

        if self.profile_img_path:
            os.remove(config.VOLUME_PATH / self.profile_img_path)

        self.profile_img_path = str(profile_img_request_path)

    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.set_profile_img(self.username, is_default_img=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.strftime('%Y-%m-%dT%H:%M:%S'),
            'profile_img_path': self.profile_img_path,
            '_links': {
                'self': url_for('v1.users.get_user', id=self.id),
            }
        }
