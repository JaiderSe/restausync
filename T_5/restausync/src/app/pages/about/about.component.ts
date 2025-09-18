import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  ultimosPedidos: any[] = []; // Add this property

  constructor() { }

  ngOnInit(): void {
    // Optionally, initialize ultimosPedidos with data here
    // Example:
    // this.ultimosPedidos = [
    //   { pedido_id: 1, numero_mesa: 5, total: 120.50, estado: 'pagado', fecha_hora: new Date() }
    // ];
  }

}