from flask import Flask, request, Response
from flask_socketio import SocketIO, emit, send, join_room
from flask_cors import CORS
from flask_uploads import UploadSet, configure_uploads, IMAGES
from users import createUser, getUser, getUserByPhone, activateUser, userIsInChat, updateSocketId
from profilepic import upload_picture
# from matchingThread import MatchingThread
from matchUtil import match
import json, time


app = Flask(__name__)
app.config['SECRET_KEY'] = 'VdC8xBfJ4u66hycU'
app.config['UPLOAD_FOLDER'] = 'pictures'
app.config['UPLOADED_PHOTOS_DEST'] = 'pictures'

socketio = SocketIO(app)
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)
CORS(app)

activeUsers = []

@app.route('/')
def hello_world():
    socketio.emit('Hello')
    return 'Hello, World!!'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    phone = data['number']

    user = getUserByPhone(phone)
    if user != -1:
        return json.dumps(user), 200, {'ContentType': 'application/json'}
    else:
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

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

@app.route('/user/socket', methods=['POST'])
def updateSocket():
    if 'id' in request.args and 'sid' in request.args:
        id = request.args.get('id')
        socketId = request.args.get('sid')
        result = updateSocketId(int(id), socketId)

        if result != -1:
            return json.dumps(result), 200, {'ContentType':'application/json'} 
        
    return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

@app.route('/user', methods=['GET'])
def retrieveUser():
    id = request.args.get('id')

    result = getUser(int(id))

    if result == -1:
        return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}
    else:
        return json.dumps(result), 200, {'ContentType':'application/json'} 

@app.route('/user/activate', methods=['POST'])
def activate():
    id = request.args.get('id')
    print('incoming id: {}'.format(id))
    result = activateUser(int(id), True)

    if result == -1:
        return json.dumps({'success':False}), 400, {'ContentType':'application/json'}
    else:
        user = getUser(int(id))
        activeUsers.append(user)
        handleSearch()

        # if searchResult is not None:
        #     join_room(searchResult[2], searchResult[0], namespace=None)
        #     join_room(searchResult[2], searchResult[1], namespace=None)

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
    emit('connected', request.sid, room=request.sid)


@socketio.on('message')
def handleMessage(msg):
    roomId = msg['roomId']
    user = msg['user']
    message = msg['message']
    emit('messageReceived', (user, message), room=roomId, broadcast=True)

@socketio.on('join')
def handleJoin(roomId):
    join_room(roomId)

def handleSearch():
    matchResult = match(activeUsers)
    if len(matchResult) != 0:
        firstUser = matchResult[0]
        secondUser = matchResult[1]
        roomId = matchResult[2]

        socketio.emit('matched', (firstUser, secondUser, roomId), room=firstUser['sid'])
        socketio.emit('matched', (secondUser, firstUser, roomId), room=secondUser['sid'])

        # return [firstUser['sid'], secondUser['sid'], roomId]

        # join_room(roomId, firstUser['sid'], request.namespace)
        # join_room(roomId, secondUser['sid'], request.namespace)


socketio.run(app, debug=True, use_reloader=False)

# time.sleep(10)

# backgroundThread = MatchingThread(socketio)

# print('starting thread')
# backgroundThread.start()
