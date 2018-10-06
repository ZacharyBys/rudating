from flask import Flask, request, Response
from flask_socketio import SocketIO, emit, send
from users import createUser
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'VdC8xBfJ4u66hycU'
socketio = SocketIO(app)

@app.route('/')
def hello_world():
    socketio.emit('Hello')
    return 'Hello, World!!'

@app.route('/users', methods=['POST'])
def newUser():
    firstName = request.form['firstName']
    lastName = request.form['lastName']
    gender = request.form['gender']
    number = request.form['number']

    code = createUser(firstName, lastName, gender, number)
    if code == 1:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
    else:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'} 

@socketio.on('connect')
def handleConnect():
    emit('Connected to backend!')

@socketio.on('message')
def handleMessage(msg):
    print('Message:' + msg)
    send(msg)

if __name__ == '__main__':
    socketio.run(app)
