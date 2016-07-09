class LavaSession(object):

    def __init__(self, id, username="Anonymous", location="Unknown"):
        self.id = id
        self.username = ""
        self.location = ""
        self.postCallback = "/centroSubmit"

    def toJson(self):
        return {
            "session_id": self.id,
            "username": self.username,
            "location": self.location,
            "callback": self.postCallback
        }