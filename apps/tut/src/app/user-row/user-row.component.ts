import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-web-space-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() user: { name: string; email: string };
  @Output() selectUser: EventEmitter<{ name: string; email: string }>;
  @Output() removeUser: EventEmitter<void>;
  constructor() {
    this.selectUser = new EventEmitter();
    this.removeUser = new EventEmitter();
  }

  onSelected() {
    this.selectUser.emit(this.user);
  }

  onDeleted() {
    this.removeUser.emit();
  }
  ngOnInit(): void {}
}
