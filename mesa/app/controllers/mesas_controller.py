# /controllers/mesas_controller.py
from flask import Blueprint, render_template, redirect, url_for
from app.models.mesas_model import MesasModel   # ✅ Ruta completa desde el paquete raíz

mesas_bp = Blueprint('mesas', __name__, template_folder='../templates')

@mesas_bp.route('/')
def mostrar_mesas():
    mesas = MesasModel.get_all()
    return render_template('mesas.html', mesas=mesas)

@mesas_bp.route('/cambiar_estado/<int:mesa_id>')
def cambiar_estado(mesa_id):
    mesas = MesasModel.get_all()
    mesa = next((m for m in mesas if m['mesa_id'] == mesa_id), None)
    if mesa:
        nuevo_estado = 'ocupada' if mesa['estado'] == 'disponible' else 'disponible'
        MesasModel.cambiar_estado(mesa_id, nuevo_estado)
    return redirect(url_for('mesas.mostrar_mesas'))
