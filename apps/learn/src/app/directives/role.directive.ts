import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[drole]'
})
export class RoleDirective {
  @HostBinding('attr.role') role = 'admin';
  @HostListener('click') onClick() {
    this.role = this.role === 'admin' ? 'guest' : 'admin';
  }
}
