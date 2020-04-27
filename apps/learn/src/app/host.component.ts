import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'learn-host',
  template: `
    <h1>Hello, you have pressed keys {{ counter }} number of times!</h1>
    <p>Press any key to increment the counter</p>
    <button (click)="reset()">Reset Counter</button>
  `
})
export class HostComponent implements OnInit {
  counter = 0;

  ngOnInit() {}

  @HostListener('window:keydown', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ) {
    this.counter++;
  }

  reset() {
    this.counter = 0;
  }
}
