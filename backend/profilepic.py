from google.cloud import storage
from google.cloud import datastore
import random

storage_client = storage.Client()
client = datastore.Client()

def upload_picture(userId, source_file_name):
    name = str(random.randint(1, 99999999))
    source_file_name = './pictures/' + source_file_name
    upload_picture_to_storage(source_file_name, name)
    return upload_picture_link(userId, name)


def upload_picture_to_storage(source_file_name, destination_blob_name):

    bucket = storage_client.get_bucket('rudating-218617.appspot.com')
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

def upload_picture_link(userId, file_name):
    userId = userId if userId != None else 0

    key = client.key('Users', userId)
    entity = client.get(key)

    link = 'https://storage.cloud.google.com/rudating-218617.appspot.com/' + file_name
    entity['picture'] = link

    client.put(entity)
    resultId = client.get(key).id

    if resultId == key.id:
        return link
    else:
        return -1