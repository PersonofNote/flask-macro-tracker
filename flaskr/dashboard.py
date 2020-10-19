from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('dashboard', __name__)


@bp.route('/')

def index():
    user_id = session.get('user_id')
    db = get_db()
    g.user = get_db().execute(
        'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()

    return render_template('dashboard/dashboard.html', user=g.user)