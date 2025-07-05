from flask import Flask
import pymysql.cursors
from flask_bcrypt import Bcrypt
from config import Config

def create_app():
    app = Flask(__name__)
    
    # Cargar configuración
    app.config.from_object(Config)

    # Inicializar Bcrypt
    bcrypt = Bcrypt(app)
    app.bcrypt = bcrypt  # Hacer bcrypt disponible en la app

    # Conexión a la base de datos MySQL
    connection = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )
    app.connection = connection

    # Registrar Blueprints (importar aquí para evitar dependencias circulares)
    from app.controllers.auth_controller import auth_bp
    from app.controllers.main_controller import main_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)

    return app