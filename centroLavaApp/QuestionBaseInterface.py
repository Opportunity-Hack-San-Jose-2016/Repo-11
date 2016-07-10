import json
from QuestionData import QuestionData
class QuestionBaseInterface:
    def __init__(self):
        self.questionDict = {}
        self.parseQuestionIn("QuestionDatabase")

    def parseQuestionIn(self,questionfiledes):
        with open(questionfiledes) as data_file:
            data = json.load(data_file)
            for k,v in data.items():
                qd = QuestionData()
                qd.colos = v["cols"]
                qd.isradio = v["isradio"]
                qd.iscolofilter = v["iscolfilter"]
                qd.qid = k
                qd.rawstring = v["rawstring"]
                qd.potentialanswers = v["potentialanswers"]
                self.questionDict[''.join(qd.colos)] = qd

    def matchColo(self,coloList):
        return self.questionDict[''.join(coloList)]
