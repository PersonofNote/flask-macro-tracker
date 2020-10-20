import time
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.exceptions import abort

from trackr.auth import login_required
from trackr.db import get_db

bp = Blueprint('dashboard', __name__)


@bp.route('/', methods=('GET', 'POST'))

def index():
    userData = []
    user_id = session.get('user_id')
    db = get_db()
    g.user = get_db().execute(
        'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()
    return render_template('dashboard/dashboard.html', user=g.user)

# TODO next: Implement updatable total calorie goals
def updateUser():

    if request.method == 'POST':
        
        error = None
        db = get_db()
        # Update based on the selected values; testing with calorie total
        db.execute(
            'UPDATE user SET calorie_total = ?'
            ' WHERE id = g.user',
            (calorie_total)
        )
        db.commit()
        return redirect("/")

    return render_template('dashboard/dashboard.html', user=g.user)