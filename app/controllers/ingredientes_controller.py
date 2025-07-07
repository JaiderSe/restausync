from flask import Blueprint, flash, render_template, redirect, url_for, request
from app.models.ingrediente import Ingrediente
from __init__ import db
from flask import send_from_directory

ingredientes_bp = Blueprint('ingredientes', __name__)
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/')
def home():
    return "Welcome"


@ingredientes_bp.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

@ingredientes_bp.route('/ingredientes')        
def index():
    ingredientes = Ingrediente.query.all()
    return render_template('ingredientes/index.html', ingredientes=ingredientes)

@ingredientes_bp.route('/ingredientes/nuevo')
def nuevo():
    return render_template('ingredientes/nuevo.html')

@ingredientes_bp.route('/ingredientes/guardar', methods=['POST'])
def guardar():
    nuevo_ing = Ingrediente(
        nombre=request.form['nombre'],
        unidad_medida=request.form['unidad_medida'],
        stock_actual=request.form['stock_actual'],
        stock_minimo=request.form['stock_minimo'],
        proveedor_principal=request.form['proveedor_principal'],
        costo_por_unidad=request.form['costo_por_unidad'],
        dias_caducidad=request.form['dias_caducidad']
    )
    db.session.add(nuevo_ing)
    db.session.commit()
    return redirect(url_for('ingredientes.index'))

@ingredientes_bp.route('/ingredientes/editar/<int:id>', methods=['GET', 'POST'])
def editar(id):
    ing = Ingrediente.query.get_or_404(id)
    if request.method == 'POST':
        ing.nombre = request.form['nombre']
        ing.unidad_medida = request.form['unidad_medida']
        ing.stock_actual = request.form['stock_actual']
        ing.stock_minimo = request.form['stock_minimo']
        ing.proveedor_principal = request.form['proveedor_principal']
        ing.costo_por_unidad = request.form['costo_por_unidad']
        ing.dias_caducidad = request.form['dias_caducidad']
        db.session.commit()
        flash('Ingrediente actualizado con éxito.', 'success')
        return redirect(url_for('ingredientes.index'))
    return render_template('ingredientes/editar.html', ingrediente=ing)

@ingredientes_bp.route('/ingredientes/eliminar/<int:id>', methods=['POST'])
def eliminar(id):
    ing = Ingrediente.query.get_or_404(id)
    db.session.delete(ing)
    db.session.commit()
    flash('Ingrediente eliminado.', 'warning')
    return redirect(url_for('ingredientes.index'))
