import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  WaiterLayoutSideBarComponent,
  WaiterLayoutContentComponent,
} from './components';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'waiter-layout',
  imports: [WaiterLayoutSideBarComponent, WaiterLayoutContentComponent],
  templateUrl: './waiter-layout.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaiterLayoutComponent {}

export default WaiterLayoutComponent;
