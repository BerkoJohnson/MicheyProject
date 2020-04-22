import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-web-space-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  value: number;
  increase() {
    this.value += 1;
  }

  decrease() {
    this.value -= 1;
  }
  constructor() {
    this.value = 1;
  }

  ngOnInit(): void {}
}
