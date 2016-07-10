class Question:

    def __init__(self, qid="", text="", type="text", options=[]):
        self.qid = qid
        self.questionText = text
        self.answerType = type
        if type not in ["checkbox", "radio", "dropdown"]:
            self.options = []
        else:
            self.options = options
        self.subquestions = []

    def toJson(self):
        return {
            "qid": self.qid,
            "text": self.questionText,
            "answer_type": self.answerType,
            "options": self.options,
            "subquestions": self.subquestions
        }
