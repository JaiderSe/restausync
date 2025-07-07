def obtener_ingredientes(mysql):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM ingredientes")
    resultados = cur.fetchall()
    cur.close()
    return resultados

def guardar_ingrediente(mysql, form):
    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO ingredientes (nombre, unidad_medida, stock_actual, stock_minimo, proveedor_principal, costo_por_unidad, dias_caducidad)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        form['nombre'],
        form['unidad_medida'],
        form['stock_actual'],
        form['stock_minimo'],
        form['proveedor_principal'],
        form['costo_por_unidad'],
        form['dias_caducidad']
    ))
    mysql.connection.commit()
    cur.close()

def obtener_ingrediente_por_id(mysql, id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM ingredientes WHERE id = %s", (id,))
    ing = cur.fetchone()
    cur.close()
    return ing

def actualizar_ingrediente(mysql, id, form):
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE ingredientes
        SET nombre=%s, unidad_medida=%s, stock_actual=%s, stock_minimo=%s, proveedor_principal=%s, costo_por_unidad=%s, dias_caducidad=%s
        WHERE id=%s
    """, (
        form['nombre'],
        form['unidad_medida'],
        form['stock_actual'],
        form['stock_minimo'],
        form['proveedor_principal'],
        form['costo_por_unidad'],
        form['dias_caducidad'],
        id
    ))
    mysql.connection.commit()
    cur.close()

def eliminar_ingrediente(mysql, id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM ingredientes WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()
