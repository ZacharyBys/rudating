from google.cloud import datastore
# Create, populate and persist an entity with keyID=1234
client = datastore.Client()
key = client.key('Users', 1234)
entity = datastore.Entity(key=key)
entity.update({
    'gender':'african',
})
client.put(entity)
# Then get by key for this entity
result = client.get(key)

print(result)
