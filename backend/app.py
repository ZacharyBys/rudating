from flask import Flask, request
from users import createUser

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/users', methods=['POST'])
def newUser():
    firstName = request.form['firstName']
    lastName = request.form['lastName']
    gender = request.form['gender']
    number = request.form['number']
    return createUser(firstName, lastName, gender, number)