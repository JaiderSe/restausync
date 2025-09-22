import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@demo.com', rol: 'mesero' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@demo.com', rol: 'chef' },
    { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@demo.com', rol: 'administrador' },
  ];

  nuevo: Usuario = { id: 0, nombre: '', email: '', rol: '' };
  editando: Usuario | null = null;

  agregarUsuario() {
    if (!this.nuevo.nombre || !this.nuevo.email || !this.nuevo.rol) return;

    this.nuevo.id = this.usuarios.length + 1;
    this.usuarios.push({ ...this.nuevo });
    this.nuevo = { id: 0, nombre: '', email: '', rol: '' };
  }

  editarUsuario(usuario: Usuario) {
    this.editando = { ...usuario };
  }

  guardarEdicion() {
    if (!this.editando) return;
    const index = this.usuarios.findIndex(u => u.id === this.editando!.id);
    if (index !== -1) this.usuarios[index] = this.editando;
    this.editando = null;
  }

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }
}
