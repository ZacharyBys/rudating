from google.cloud import datastore
import random

client = datastore.Client()

def addNewNumber(userId, num):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    if 'savedNumbers' in entity and entity['savedNumbers'] != None:
        entity['savedNumbers'] = entity['savedNumbers'] + ', ' + num
    else:
        entity['savedNumbers'] = num

    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return num
    else:
        return -1

def getNumbers(userId):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    if 'savedNumbers' in entity and entity['savedNumbers'] != None:
        nums = entity['savedNumbers']

    resultId = client.get(key).id

    if resultId == key.id:
        return nums
    else:
        return -1


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
    print('in')

    if entity != None:
        user = {}
        for key, value in entity.items():
            user[key] = value

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
