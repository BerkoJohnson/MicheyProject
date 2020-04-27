import { Directive, HostBinding, HostListener } from '@angular/core';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[dcolor]' })
export class ColorDirective {
  possibleColors = [
    'red',
    'blue',
    'grey',
    'yellow',
    'pink',
    'green',
    'gold',
    'lightgreen'
  ];
  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;

  @HostListener('keydown') newColor() {
    const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }
}
