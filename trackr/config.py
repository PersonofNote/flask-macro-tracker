''' This is mostly for WTForms validation; I am undecided if I will end up using webforms or
relying on the decoupled React frontend, but am leaving the config object for now '''

import os

class Config(object):
    # In prod, set a secure key to prevent CSRF
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'asdghj10u93209235'