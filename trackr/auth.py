import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from trackr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

# For printing
import sys

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        calorie_total = request.form['calorie_total']
        fat = request.form['fat']
        carb = request.form['carbs']
        protein = request.form['protein']
        water_amount = request.form['water_amount']
        vegetables = request.form['vegetables']
        waist = request.form['waist']
        bust = request.form['bust']
        hips = request.form['hips']
        bodyweight = request.form['bodyweight']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.execute(
            'SELECT id FROM user WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            #TODO: Check for injection
            db.execute(
                'INSERT INTO user (username, password, calorie_total, fat, carb, protein, water_amount, vegetables, waist, bust, hips, bodyweight) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (username, generate_password_hash(password), calorie_total, fat, carb, protein, water_amount, vegetables, waist, bust, hips, bodyweight)
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        print(request.json, file=sys.stdout)
        username = request.json['username']
        password = request.json['password']
        db = get_db()
        error = None
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)

    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

@bp.route('/logout')
def logout():
    print('Logging out', sys.stdout)
    session.clear()
    return redirect(url_for('index'))


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view