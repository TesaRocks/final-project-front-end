import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/aplication-state';
import { updateHeader } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private store: Store<IApplicationState>) {}

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'Final Project' }));
  }
}
