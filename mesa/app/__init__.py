from flask import Flask
from app.controllers.mesas_controller import mesas_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = 'clave_secreta'  # Opcional

    # Registrar rutas
    app.register_blueprint(mesas_bp, url_prefix='/mesas')

    return app
