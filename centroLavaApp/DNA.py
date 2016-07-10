from QuestionData import QuestionData
from DataBaseInterface import DataBaseInterface
from QuestionBaseInterface import QuestionBaseInterface
from datamodel import database


class DNA:

    db = database()
    qb = QuestionBaseInterface()
    currentquestion = QuestionData()
    interestedcolo = []
    currentList = []

    def __init__(self):
        self.db = database()
        self.qb = QuestionBaseInterface()
        self.currentquestion = QuestionData()
        self.interestedcolo = self.currentquestion.colos


    def answer(self,listofstr):
        if self.currentquestion.iscolofilter:
            self.interestedcolo = self.currentquestion.answer(listofstr)
            self.db.fileter_cato(self.interestedcolo)
        else:
            self.db.filter_col(self.interestedcolo[0], listofstr)
        self.currentList = self.db.content


    def newQ(self):
        if self.currentquestion.iscolofilter and len(self.interestedcolo) > 3:
            self.currentquestion = self.qb.matchColo(self.interestedcolo)
        else:
            self.currentquestion = self.qb.matchColo(self.entrofy())



    def entrofy(self):
        entroq = "Cost"
        return entroq


















