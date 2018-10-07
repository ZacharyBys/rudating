from google.cloud import datastore
import random

client = datastore.Client()

def createUser(firstName, lastName, gender, number):

    key = client.key('Users', random.randint(1, 99999999))
    entity = datastore.Entity(key=key)
    entity.update({
        'firstName':firstName,
        'lastName':lastName,
        'gender':gender,
        'number':number,
        'active':False,
        'inChat':False,
    })
    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return resultId
    else:
        return -1

def getUser(userId):
    userId = userId if userId != None else 0
    
    key = client.key('Users', userId)
    entity = client.get(key)
    if entity != None:
        user = {}
        for key, value in entity.items():
            user[key] = value

        return user
    else:
        return -1

def getUserByPhone(phone):
    phone = phone if phone != None else ''
    query = client.query(kind='Users')
    query.add_filter('number', '=', str(phone))
    queryResult = list(query.fetch())
    entity = queryResult[0]
    
    if entity != None:
        user = {}
        for key, value in entity.items():
            user[key] = value
        user['id'] = entity.id
        return user
    else:
        return -1


def activateUser(userId, activate):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    if activate:
        entity['active'] = True
    else:
        entity['active'] = False

    entity.active = True
    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return resultId
    else:
        return -1

def userIsInChat(userId, inChat):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    if inChat == True:
        entity['inChat'] = True
    else:
        entity['inChat'] = False

    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return resultId
    else:
        return -1

def updateSocketId(userId, socketId):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    entity['sid'] = socketId
    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return socketId
    else:
        return -1
