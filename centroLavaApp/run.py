from flask import Flask, render_template, request, json, session
from LavaSession import LavaSession
from Question import Question

app = Flask(__name__)

############################ Session Init Info ############################


SESSION_INFO = LavaSession(username="johndoe1", name="John Doe")


########################## Session Init Info Ends ##########################


@app.route("/centroSubmitFollow", methods=['GET', 'POST'])
def ajaxSubmit():
    """
    Handles HTTP requests (GET and POST) that are sent through ajax (i.e. without control of page redirection).

    :return: A serialized json object that contains the session information to be used in javascript
    """
    postRequest = request.json or request.form  # Short circuit the data fetch
    return json.dumps({"session_info": SESSION_INFO.toJson()})


@app.route("/centrosubmit", methods=['GET', 'POST'])
def redirectSubmit():
    """
    Handles HTTP requests (GET and POST) with redirection after the request submission.

    :return: The rendered new page that will be displayed, with relevant arguments provided
    """
    postRequest = request.json or request.form
    return render_template('question.html', session_info=SESSION_INFO.toJson())


@app.route("/submitResult")
def submitResult():
    return render_template('finalresult.html', session_info=SESSION_INFO.toJson())


@app.route("/")
@app.route("/index")
def index():
    """
    Handles requests to the home page (index page)

    :return: The rendered index page that will be displayed, with rele
    """
    return render_template('index.html', session_info=SESSION_INFO.toJson())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
