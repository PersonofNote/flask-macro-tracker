import os

class Config(object):
    # In prod, set a secure key to prevent CSRF
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'asdghj10u93209235'