import json
from QuestionData import QuestionData
class QuestionBaseInterface:
    def __init__(self):
        self.questionDict = {}

    def parseQuestionIn(self,questionfiledes):
        with open(questionfiledes) as data_file:
            data = json.load(data_file)
            for k,v in data:
                qd = QuestionData()
                qd.colos = v["col"]
                qd.isradio = v["isradio"]
                qd.iscolofilter = v["iscolofilter"]
                qd.qid = k
                qd.rawstring = v["rawstring"]
                qd.potentialanswers = v["potentialanswers"]
                self.questionDict[qd.colos] = qd

    def matchColo(self,coloList):
        return self.questionDict[coloList]
