import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // 👈 aquí importa CommonModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
  { image: 'assets/slide_1.jpg', title: 'Descubre sabores únicos' },
  { image: 'assets/slide_2.jpg', title: 'Experiencias inolvidables' },
  { image: 'assets/slide_3.jpg', title: 'Gastronomía con pasión' }
];


  currentIndex = 0;

  constructor() {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
