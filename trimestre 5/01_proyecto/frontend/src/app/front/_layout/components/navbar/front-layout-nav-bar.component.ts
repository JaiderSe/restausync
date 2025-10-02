import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'front-layout-nav-bar',
  imports: [RouterLink],
  templateUrl: './front-layout-nav-bar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontLayoutNavBarComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  appName = computed<string>(() => environment.appName);

  public authStatus = computed(() => this._authService.authStatus());
  public userName = computed(() => {
    const name = this._authService.user()?.name;
    return name === 'Administrator' ? 'Administracion' : name;
  });

  public displayName = computed(() => {
    const user = this._authService.user();
    if (!user || !user.role) return this.userName();

    const roleName = user.role.name.toLowerCase();
    return roleName === 'mesero' ? 'Panel de Mesero' : this.userName();
  });

  public isWaiter = computed(() => {
    const user = this._authService.user();
    return user?.role_id === 4;
  });

  public isAdmin = computed(() => {
    const user = this._authService.user();
    return user?.role_id === 1;
  });

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}

export default FrontLayoutNavBarComponent;
