import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-front-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './front-home-page.component.html',
  styles: ``,
})
export class FrontHomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  currentYear = new Date().getFullYear();

  // Variables para el carrusel de platos
  currentSlide = 0;
  totalSlides = 5;
  isAutoPlayPaused = false;
  autoPlayInterval: any;
  carousel: any;
  prevBtn: any;
  nextBtn: any;
  observer: any;
  scrollY = 0;
  parallaxElements: HTMLElement[] = [];
  animatedElements: HTMLElement[] = [];

  // Carrusel de imágenes de fondo
  private backgroundImages = [
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80', // Pizza principal
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1920&q=80', // Pizza gourmet
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80', // Hamburguesa
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1920&q=80', // Postre
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80', // Restaurante elegante
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1920&q=80', // Mesa elegante
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80', // Restaurante moderno
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80', // Food photography
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1920&q=80', // Burger premium
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1920&q=80'  // Restaurante acogedor
  ];

  private currentImageIndex = 0;
  private backgroundInterval: any;

  ngOnInit(): void {
    this.startBackgroundCarousel();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  // Método combinado para limpiar todos los recursos

  private startBackgroundCarousel(): void {
    // Establecer la primera imagen
    this.updateBackgroundImage();

    // Cambiar imagen cada 8 segundos
    this.backgroundInterval = setInterval(() => {
      this.nextBackgroundImage();
    }, 8000);
  }

  private nextBackgroundImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    this.updateBackgroundImage();
  }

  private updateBackgroundImage(): void {
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
      // Aplicar nueva imagen
      heroBg.style.backgroundImage = `url('${this.backgroundImages[this.currentImageIndex]}')`;

      // Efecto de transición suave
      heroBg.style.transform = 'scale(1.05)';
      heroBg.style.opacity = '0.4';

      // Fade in effect con escala
      setTimeout(() => {
        heroBg.style.opacity = '0.8';
        heroBg.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Métodos para el carrusel de platos

  private initializeCarousel(): void {
    // Configurar event listeners para los botones de navegación
    this.prevBtn = { nativeElement: document.getElementById('prevBtn') };
    this.nextBtn = { nativeElement: document.getElementById('nextBtn') };
    this.carousel = { nativeElement: document.getElementById('carousel') };

    if (this.prevBtn.nativeElement) {
      this.prevBtn.nativeElement.addEventListener('click', () => {
        this.prevSlide();
      });
    }

    if (this.nextBtn.nativeElement) {
      this.nextBtn.nativeElement.addEventListener('click', () => {
        this.nextSlide();
      });
    }

    // Configurar indicadores
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Iniciar auto-play
    this.startAutoPlay();

    // Pausar auto-play al hacer hover
    if (this.carousel.nativeElement) {
      this.carousel.nativeElement.addEventListener('mouseenter', () => {
        this.pauseAutoPlay();
      });

      this.carousel.nativeElement.addEventListener('mouseleave', () => {
        this.resumeAutoPlay();
      });
    }
  }

  private nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % 5;
    this.updateCarousel();
  }

  private prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + 5) % 5;
    this.updateCarousel();
  }

  private goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    if (this.carousel?.nativeElement) {
      const translateX = -this.currentSlide * 100;
      this.carousel.nativeElement.style.transform = `translateX(${translateX}%)`;
    }

    // Actualizar indicadores
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.remove('bg-gray-600', 'hover:bg-gray-500');
        indicator.classList.add('bg-orange-500');
      } else {
        indicator.classList.remove('bg-orange-500');
        indicator.classList.add('bg-gray-600', 'hover:bg-gray-500');
      }
    });

    // Reiniciar auto-play después de interacción manual
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      if (!this.isAutoPlayPaused) {
        this.nextSlide();
      }
    }, 5000); // Cambiar slide cada 5 segundos
  }

  private pauseAutoPlay(): void {
    this.isAutoPlayPaused = true;
  }

  private resumeAutoPlay(): void {
    this.isAutoPlayPaused = false;
  }

  private restartAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    // Limpiar recursos del fondo
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval);
    }

    // Limpiar recursos del carrusel
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}
