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
