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
            "qid": str(self.qid),
            "text": str(self.questionText),
            "answer_type": str(self.answerType),
            "options": [str(opt) for opt in self.options],
            "subquestions": self.subquestions
        }