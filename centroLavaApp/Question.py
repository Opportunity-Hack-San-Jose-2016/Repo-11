import random
import string


class Question(object):

    def __init__(self, id="", text="", type="text", options=[]):
        self.questionId = id if id != "" else self.random_id(6)
        self.questionText = text
        self.answerType = type
        if type != "checkbox" or type != "radio":
            self.options = []
        else:
            self.options = options
        self.subquestions = []

    @staticmethod
    def random_id(size=6, chars=string.ascii_uppercase + string.digits):
        """
        Generate a random string id.

        @param size: The desired length of the id
        @param chars: The set of acceptable characters in the id
        @return: The generated string format id
        """
        return ''.join(random.choice(chars) for _ in range(size))

    def toJson(self):
        return {
            "id": self.questionId,
            "text": self.questionText,
            "answer_type": self.answerType,
            "options": self.options,
            "subquestions": self.subquestions
        }