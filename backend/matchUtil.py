import uuid
from users import getUser

def match():
    roomId = uuid.uuid4()
    user1 = getUser(14707211)
    user2 = getUser(25952405)
    return [user1, '2e95dd1eef204a0a8b1f3bf6ba5f6e90', user2, '05cda0776c3d4d13b7b5f15eb0138a2f', str(roomId)]
