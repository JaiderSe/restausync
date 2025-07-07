from flask import Blueprint, flash, render_template, redirect, url_for, request
from app.models.ingrediente import obtener_ingredientes, guardar_ingrediente, obtener_ingrediente_por_id, actualizar_ingrediente, eliminar_ingrediente
from app.extensions import mysql
from flask import send_from_directory

ingredientes_controller = Blueprint('ingredientes', __name__)

@ingredientes_controller.route('/')
def index():
    return "Welcome"

@ingredientes_controller.route('/ingredientes')
def listar():
    datos = obtener_ingredientes(mysql)
    return render_template('ingredientes/listar.html', ingredientes=datos)


@ingredientes_controller.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')

@ingredientes_controller.route('/ingredientes/nuevo')
def nuevo():
    return render_template('ingredientes/nuevo.html')

@ingredientes_controller.route('/ingredientes/guardar', methods=['POST'])
def guardar():
    guardar_ingrediente(mysql, request.form)
    flash('Ingrediente guardado correctamente', 'success')
    return redirect(url_for('ingredientes.listar'))

@ingredientes_controller.route('/ingredientes/editar/<int:id>', methods=['GET', 'POST'])
def editar(id):
    if request.method == 'POST':
        actualizar_ingrediente(mysql, id, request.form)
        flash('Ingrediente actualizado con éxito.', 'success')
        return redirect(url_for('ingredientes.listar'))

    ing = obtener_ingrediente_por_id(mysql, id)
    return render_template('ingredientes/editar.html', ingrediente=ing)

@ingredientes_controller.route('/ingredientes/eliminar/<int:id>', methods=['POST'])
def eliminar(id):
    eliminar_ingrediente(mysql, id)
    flash('Ingrediente eliminado.', 'warning')
    return redirect(url_for('ingredientes.listar'))
