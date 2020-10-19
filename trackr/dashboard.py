import time
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from trackr.auth import login_required
from trackr.db import get_db

bp = Blueprint('dashboard', __name__)


@bp.route('/user/')

def index():
    user_id = session.get('user_id')
    db = get_db()
    g.user = get_db().execute(
        'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()

    return {'user': g.user}
    
    #return render_template('dashboard/dashboard.html', user=g.user)