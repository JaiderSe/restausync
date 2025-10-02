import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { iMenuItem } from '@shared/interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'waiter-layout-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './waiter-layout-side-bar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaiterLayoutSideBarComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  menuItems = signal<iMenuItem[]>([
    { path: '/waiter', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    {
      path: '/waiter/pedidos',
      label: 'Pedidos',
      icon: 'fas fa-clipboard-list',
    },
    { path: '/waiter/mesas', label: 'Mesas', icon: 'fas fa-chair' },
    {
      path: '/waiter/nuevo-pedido',
      label: 'Nuevo Pedido',
      icon: 'fas fa-plus',
    },
    { path: '/waiter/perfil', label: 'Perfil', icon: 'fas fa-user' },
  ]);

  logout(): void {
    try {
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        this._authService.logout();
        this._router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default WaiterLayoutSideBarComponent;
