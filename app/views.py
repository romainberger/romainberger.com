from flask import render_template
from app import app

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/about')
def about():
	return render_template('about.html')

@app.route('/web')
def web():
	return render_template('web.html')

@app.route('/music')
def music():
	return render_template('music.html')

@app.route('/lab')
def lab():
	return render_template('lab.html')
