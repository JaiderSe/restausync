from .. import db


class Ingrediente(db.Model):
    __tablename__ = 'ingredientes'
    ingrediente_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    unidad_medida = db.Column(db.String(20))
    stock_actual = db.Column(db.Float)
    stock_minimo = db.Column(db.Float)
    proveedor_principal = db.Column(db.String(100))
    costo_por_unidad = db.Column(db.Float)
    dias_caducidad = db.Column(db.Integer)
