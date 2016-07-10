from flask import Flask, render_template, request, json, session
from LavaSession import LavaSession
from DNA import DNA
from datamodel import database
from QuestionBaseInterface import QuestionBaseInterface
app = Flask(__name__)

############################ Session Init Info ############################


SESSION_INFO = LavaSession(username="johndoe1", name="John Doe")
DNA = DNA()
INITIALIZED = ["Agriculture","Food and Beverage","Services","Products","Healthcare","Open Entry"]
DNA.interestedcolo = INITIALIZED
DNA.db = database()
DNA.qb = QuestionBaseInterface()
DNA.currentquestion = DNA.qb.matchColo(INITIALIZED)
SESSION_INFO.question = DNA.currentquestion.toQestion()


########################## Session Init Info Ends ##########################


@app.route("/centroSubmitFollow", methods=['GET', 'POST'])
def ajaxSubmit():
    """
    Handles HTTP requests (GET and POST) that are sent through ajax (i.e. without control of page redirection).

    :return: A serialized json object that contains the session information to be used in javascript
    """

    postRequest = request.json or request.form  # Short circuit the data fetch
    print postRequest
    DNA.answer(postRequest.getList(DNA.currentquestion.qid))
    return json.dumps({"session_info": SESSION_INFO.toJson()})


@app.route("/centrosubmit", methods=['GET', 'POST'])
def redirectSubmit():
    """
    Handles HTTP requests (GET and POST) with redirection after the request submission.

    :return: The rendered new page that will be displayed, with relevant arguments provided
    """
    postRequest = request.json or request.form
    print postRequest
    return render_template('question.html', session_info=SESSION_INFO.toJson())


@app.route("/")
@app.route("/index")
def index():
    """
    Handles requests to the home page (index page)

    :return: The rendered index page that will be displayed, with rele
    """
    print SESSION_INFO.toJson()
    return render_template('index.html', session_info=SESSION_INFO.toJson())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
