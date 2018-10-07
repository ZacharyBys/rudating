import uuid
from users import getUser

def match(userList):
    if len(userList) >= 2:
        roomId = uuid.uuid4()
        user1 = userList.pop()
        user2 = userList.pop()
        return [user1, user2, str(roomId)]
    return []
