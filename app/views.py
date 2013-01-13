from flask import render_template
from app import app

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/about')
def about():
	return render_template('about.html', page = 'about')

@app.route('/web')
def web():
	return render_template('web.html', page = 'web')

@app.route('/music')
def music():
	return render_template('music.html', page = 'music')

@app.route('/lab')
def lab():
	return render_template('lab.html', page = 'lab')
