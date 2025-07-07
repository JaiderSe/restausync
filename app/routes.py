from app.controllers.ingredientes_controller import ingredientes_controller

def register_routes(app):
    app.register_blueprint(ingredientes_controller)
