from flask import url_for
from sqlalchemy.sql import func
from werkzeug.security import check_password_hash

from app import db


class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, page_size, endpoint, **kwargs):
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
    password = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, server_default=func.now())

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.strftime('%Y-%m-%dT%H:%M:%S'),
            '_links': {
                'self': url_for('v1.users.get_user', id=self.id),
            }
        }
