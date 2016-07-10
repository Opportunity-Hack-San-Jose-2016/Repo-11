from Question import Question


class QuestionData(object):

    rawstring = ""
    colos = []
    potentialanswers = {}
    iscolofilter = False
    qid = ""
    isradio = False

    def __init__(self):
        self.rawstring = ""
        self.colos = []
        self.potentialanswers = {}
        self.iscolofilter = False
        self.qid = ""
        self.isradio = False

    def toQestion(self):
        type = "checkbox"
        if self.isradio:
            type = "radio"
        question = Question(qid=self.qid,text=self.rawstring,type=type,options=self.potentialanswers.keys())
        return question

    def answer(self, answerstrList):
        if isradio:
            return self.potentialanswers[answerstrList]
        else:
            listofresp = []
            for ans in answerstrList:
                listofresp.append(self.potentialanswers[ans])
            return listofresp
