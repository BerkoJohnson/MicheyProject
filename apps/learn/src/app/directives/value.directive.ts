import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[dvalue]' })
export class ValueDirective {
  @HostListener('keydown', ['$event.target']) onType(e: EventTarget) {
    console.log(e['value']);
  }
}
