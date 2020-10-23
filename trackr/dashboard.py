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


@bp.route('/user', methods=('GET', 'POST'))
@login_required
def index():
    user_id = session.get('user_id')
    g.user = get_db().execute(
        'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()
    
    # Comment and uncomment to switch between templates and React decoupled frontend
    return jsonify(name = g.user['username'], calorie_total = g.user['calorie_total'], fat_goal = g.user['fat'], carb_goal = g.user['carb'], protein_goal = g.user['protein'], water_amount = g.user['water_amount'], vegetable_goal = g.user['vegetables'], waist = g.user['waist'], bust = g.user['bust'], hips = g.user['hips'], bodyweight = g.user['bodyweight'])
    #return render_template('dashboard/dashboard.html', user=g.user)

# Temporary for getting a working app going.
@bp.route('/update', methods=('GET', 'POST'))
@login_required
def update():
    user_id = session.get('user_id')
    if request.method == 'POST':
        # temp for testing; rework to iterate over columns in user
        calorie_total = request.form['calorie_total']
        bodyweight = request.form['bodyweight']
        water_amount = request.form['water_amount']
        carb = request.form['carb']
        fields = request.form.to_dict()
        for field in fields:
            # iterate over columns in user row
            print(fields[field])
        db = get_db()
        db.execute(
            'UPDATE user SET calorie_total = ?, bodyweight = ?, water_amount = ?, carb = ?'
            ' WHERE id = ?',
            (calorie_total, bodyweight, water_amount, carb, user_id)
        )
        db.commit()
        return redirect('/update')

    else:
        pass
    
    return render_template('dashboard/update.html', user=g.user)


    # Temporary for getting a working app going
@bp.route('/graph')
@login_required
def graph():
    '''
        Fetch each day's entry and plot along a graph.
        Will require making a new model for days and creating a one-to-many relationship where
        a user has many days
    '''

    return 