from flask import Flask
from config import Config
from .extensions import mysql
from .routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar MySQL (Flask-MySQLdb)
    mysql.init_app(app)

    # Registrar todas las rutas
    register_routes(app)

    return app
