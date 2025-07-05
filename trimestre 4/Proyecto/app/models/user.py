from flask_bcrypt import Bcrypt

# Elimina la importación de app y usa un enfoque diferente
bcrypt = Bcrypt()

class User:
    def __init__(self, connection):
        self.connection = connection
        self.bcrypt = bcrypt  # Pasamos bcrypt como atributo

    def create_user(self, nombre, email, password, rol):
        hashed_password = self.bcrypt.generate_password_hash(password).decode('utf-8')
        with self.connection.cursor() as cursor:
            sql = """
            INSERT INTO usuarios (nombre, email, contraseña_hash, rol)
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql, (nombre, email, hashed_password, rol))
            self.connection.commit()
            return cursor.lastrowid

    def get_user_by_email(self, email):
        with self.connection.cursor() as cursor:
            sql = "SELECT * FROM usuarios WHERE email = %s"
            cursor.execute(sql, (email,))
            return cursor.fetchone()

    def verify_password(self, user, password):
        if user:
            return self.bcrypt.check_password_hash(user['contraseña_hash'], password)
        return False