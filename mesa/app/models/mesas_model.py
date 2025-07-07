# /models/mesas_model.py
from app.database import get_db_connection  # ✅

class MesasModel:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        if not conn:
            return []
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM mesas")
        mesas = cursor.fetchall()
        conn.close()
        return mesas

    @staticmethod
    def cambiar_estado(mesa_id, nuevo_estado):
        conn = get_db_connection()
        if not conn:
            return False
        try:
            cursor = conn.cursor()
            query = "UPDATE mesas SET estado = %s WHERE mesa_id = %s"
            cursor.execute(query, (nuevo_estado, mesa_id))
            conn.commit()
            return True
        except Exception as e:
            print(f"Error al actualizar estado: {e}")
            conn.rollback()
            return False
        finally:
            conn.close()
