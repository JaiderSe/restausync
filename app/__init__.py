from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask
from .routes.ingredientes_routes import ingredientes_bp

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'tu_clave_secreta_segura'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ingredientes.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app)

    # Registro de Blueprints
    app.register_blueprint(ingredientes_bp)

    return app
