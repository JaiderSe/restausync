import { InventarioService } from '@admin/services/inventario.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  IsEmptyComponent,
  IsErrorComponent,
  IsLoadingComponent,
} from '@shared/components';
import { AdminInventarioTableComponent } from './components';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admin-inventario-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IsEmptyComponent,
    IsErrorComponent,
    IsLoadingComponent,
    AdminInventarioTableComponent,
  ],
  templateUrl: './admin-inventario-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInventarioPageComponent implements OnInit {
  private _inventarioService: InventarioService = inject(InventarioService);
  private reloadTrigger$ = new BehaviorSubject(0);

  inventarioResource = rxResource({
    request: () => this.reloadTrigger$.value,
    loader: () => this._inventarioService.getAll(),
  });

  ngOnInit() {
    this._inventarioService.reload$.subscribe(() => {
      this.reloadTrigger$.next(this.reloadTrigger$.value + 1);
    });
  }
}

export default AdminInventarioPageComponent;
