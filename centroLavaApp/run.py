from flask import Flask, render_template, request, json, session
from LavaSession import LavaSession
from DNA import DNA
from datamodel import database
from QuestionBaseInterface import QuestionBaseInterface
from Question import Question
app = Flask(__name__)
app.secret_key = '5656798291'


############################ Session Init Info ############################


SESSION_INFO = LavaSession(username="johndoe1", name="John Doe")
dna = DNA()
INITIALIZED = [
      "Agriculture",
      "Food and Beverage",
      "Services",
      "Products",
      "Healthcare",
      "Open Entry"
    ]
dna.interestedcolo = INITIALIZED
dna.db = database()
dna.qb = QuestionBaseInterface()
dna.currentquestion = dna.qb.matchColo(INITIALIZED)
SESSION_INFO.question = dna.currentquestion.toQestion()




########################## Session Init Info Ends ##########################


@app.route("/centroSubmitFollow", methods=['GET', 'POST'])
def ajaxSubmit():
    """
    Handles HTTP requests (GET and POST) that are sent through ajax (i.e. without control of page redirection).

    :return: A serialized json object that contains the session information to be used in javascript
    """

    postRequest = request.json or request.form # Short circuit the data fetch
    print postRequest
    print postRequest.getlist('answer')
    alist = eval("".join(postRequest.getlist('answer')))
    if alist == []:
        return json.dumps({"session_info": SESSION_INFO.toJson()})
    dna.answer(alist)
    dna.newQ()
    print dna.currentquestion
    if dna.currentquestion == -1 or dna.currentquestion == "error":
        print "error got"
        SESSION_INFO.result = dna.currentList
        q = Question()
        q.qid = "-1"
        SESSION_INFO.question = q
        return json.dumps({"session_info": SESSION_INFO.toJson()})
    SESSION_INFO.question = dna.currentquestion.toQestion()
    return json.dumps({"session_info": SESSION_INFO.toJson()})


@app.route("/centrosubmit", methods=['GET', 'POST'])
def redirectSubmit():
    """
    Handles HTTP requests (GET and POST) with redirection after the request submission.

    :return: The rendered new page that will be displayed, with relevant arguments provided
    """
    postRequest = request.json or request.form or request.args
    print postRequest
    return render_template('question.html', session_info=SESSION_INFO.toJson())

@app.route("/finalresult", methods=['GET', 'POST'])
def submitResult():

    print SESSION_INFO.result
    return render_template('finalresult.html', session_info=SESSION_INFO.toJson())



@app.route("/")
@app.route("/index")
def index():
    """
    Handles requests to the home page (index page)

    :return: The rendered index page that will be displayed, with rele
    """
    global SESSION_INFO
    SESSION_INFO = LavaSession(username="johndoe1", name="John Doe")
    global dna
    dna = DNA()
    dna.interestedcolo = INITIALIZED
    dna.db = database()
    dna.qb = QuestionBaseInterface()
    dna.currentquestion = dna.qb.matchColo(INITIALIZED)
    SESSION_INFO.question = dna.currentquestion.toQestion()
    #session['sid'] = SESSION_INFO.sid
    print SESSION_INFO.toJson()
    return render_template('index.html', session_info=SESSION_INFO.toJson())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5063)
