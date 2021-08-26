import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent implements OnInit {
  @Input() num: number = 0;
  @Output() newItem = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  onNewItem(value: string) {
    this.newItem.emit(value);
  }
}
