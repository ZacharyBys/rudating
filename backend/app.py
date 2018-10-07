from flask import Flask, request, Response
from flask_socketio import SocketIO, emit, send, join_room
from flask_cors import CORS
from flask_uploads import UploadSet, configure_uploads, IMAGES
from users import createUser, getUser, activateUser, userIsInChat
from profilepic import upload_picture
from matchingThread import MatchingThread
import json, time


app = Flask(__name__)
app.config['SECRET_KEY'] = 'VdC8xBfJ4u66hycU'
app.config['UPLOAD_FOLDER'] = 'pictures'
app.config['UPLOADED_PHOTOS_DEST'] = 'pictures'

socketio = SocketIO(app)
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)
CORS(app)

@app.route('/')
def hello_world():
    socketio.emit('Hello')
    return 'Hello, World!!'

@app.route('/users', methods=['POST'])
def newUser():
    data = request.get_json()
    firstName = data['firstName']
    lastName = data['lastName']
    gender = data['gender']
    number = data['number']

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
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}
    else:
        return json.dumps(result), 200, {'ContentType':'application/json'} 

@app.route('/user/activate', methods=['PUT'])
def activate():
    id = request.args.get('id')
    result = activateUser(int(id), True)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/user/deactivate', methods=['PUT'])
def deactivate():
    id = request.args.get('id')
    result = activateUser(int(id), False)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/user/inchat', methods=['PUT'])
def inChat():
    id = request.args.get('id')
    result = userIsInChat(int(id), True)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/user/outchat', methods=['PUT'])
def outChat():
    id = request.args.get('id')
    result = userIsInChat(int(id), False)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route('/upload', methods=['POST'])
def uploadPicture():
    if 'id' in request.args and 'photo' in request.files:
        id = request.args.get('id')
        filename = photos.save(request.files['photo'])
        link = upload_picture(int(id), filename)

        if link == -1:
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
        else:
            return json.dumps({'link':link}), 200, {'ContentType':'application/json'}


@socketio.on('connect')
def handleConnect():
    print(request.sid)
    emit('connected', request.sid, room=request.sid)


@socketio.on('message')
def handleMessage(msg):
    print('ClientID:' + request.sid)
    emit('message', msg, room=request.sid)


socketio.run(app, debug=True, use_reloader=False)
backgroundThread = MatchingThread(socketio)

print('starting thread')
backgroundThread.start()
