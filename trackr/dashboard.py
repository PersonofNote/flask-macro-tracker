from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from trackr.auth import login_required
from trackr.db import get_db

from flask import jsonify

# For printing
import sys

bp = Blueprint('dashboard', __name__)


@bp.route('/', methods=('GET', 'POST'))
@login_required
def index():
    user_id = session.get('user_id')
    db = get_db()
    g.user = get_db().execute(
        'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()
    return render_template('dashboard/dashboard.html', user=g.user)

# Temporary for getting a working app going
@bp.route('/update', methods=('GET', 'POST'))
@login_required
def update():
    user_id = session.get('user_id')
    calorie_total = 500
    if request.method == 'POST':
        calorie_total = request.form['calorie_total']
        db = get_db()
        db.execute(
            'UPDATE user SET calorie_total = ?'
            ' WHERE id = ?',
            (calorie_total, user_id)
        )
        db.commit()
        return redirect('/')
    else:
        pass
    
    return render_template('dashboard/update.html', user=g.user)