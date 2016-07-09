from flask import Flask, render_template, request, json, session

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def index():
    hackname = "PayPal 2016 Opportunity Hack"
    return render_template('index.html', hackname=hackname)

if __name__ == "__main__":
    app.run(port=5000)