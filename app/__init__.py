from flask import Flask
from config import Config
import mysql.connector

db = mysql.connector


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.config['MYSQL_CONNECTION'] = mysql.connector.connect(
    host=Config.MYSQL_HOST,
    user=Config.MYSQL_USER, 
    password=Config.MYSQL_PASSWORD,
    database=Config.MYSQL_DB)

    return app
