from flask import Flask, request, Response
from users import createUser, getUser, activateUser
import json

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

    code = createUser(firstName, lastName, gender, number)
    if code != -1:
        return json.dumps({'id':code, 'firstName':firstName, 'lastName':lastName, 'gender':gender, 'number':number, 'success':True}), 200, {'ContentType':'application/json'} 
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'} 

@app.route('/user', methods=['GET'])
def retrieveUser():
    id = request.args.get('id')

    result = getUser(int(id))

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps(result), 200, {'ContentType':'application/json'} 

@app.route('/user/activate', methods=['POST'])
def activate():
    id = request.args.get('id')
    deactivate = request.args.get('deactivate') if request.args.get('deactivate') else False

    result = activateUser(int(id), deactivate)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 