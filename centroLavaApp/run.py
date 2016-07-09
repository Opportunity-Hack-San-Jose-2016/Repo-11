from flask import Flask, render_template, request, json, session

app = Flask(__name__)

@app.route("/centrosubmit", methods=['GET', 'POST'])
def submit():
    postRequest = request.json
    print postRequest
    return render_template('index.html', hackname={"hackname": "a"})

@app.route("/")
@app.route("/index")
def index():
    hackname = "PayPal 2016 Opportunity Hack"
    return render_template('index.html', hackname={"hackname": "a"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)