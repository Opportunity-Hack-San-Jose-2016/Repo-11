from Answer import Answer
from Question import Question
from QuestionData import QuestionData
from DataBaseInterface import DataBaseInterface
from QuestionBaseInterface import QuestionBaseInterface


class DNA:

    db = DataBaseInterface()
    qb = QuestionBaseInterface()
    currentquestion = QuestionData()
    interestedcolo = []
    currentList = []

    def __init__(self):
        self.db = DataBaseInterface()
        self.currentquestion = QuestionData()
        self.interestedcolo = self.currentquestion.colos


    def answer(self,listofstr):
        if self.currentquestion.iscolofilter:
            self.interestedcolo = self.currentquestion.answer(listofstr)
            self.db.matchone(self.interestedcolo)
        else:
            self.db.match(self.interestedcolo, listofstr)
        self.currentList = self.db.content


    def newQ(self):
        if self.currentquestion.iscolofilter && len(self.interestedcolo) > 3:
            self.currentquestion = self.qb.matchColo(self.interestedcolo)
        else:
            self.currentquestion = self.qb.matchColo(self.entrofy())



    def entrofy(self):
        entroq = ""
        return entroq


















