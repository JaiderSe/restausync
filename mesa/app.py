# /app.py
from flask import Flask
from controllers.mesas_controller import mesas_bp

app = Flask(__name__)
app.register_blueprint(mesas_bp, url_prefix='/mesas')

@app.route('/')
def index():
    return "Bienvenido a RestausyncApp. Visita /mesas para ver el estado de las mesas."

if __name__ == '__main__':
    app.run(debug=True)
