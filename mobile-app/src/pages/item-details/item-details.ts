import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { MocksService } from './../../services/mocks.service';

import { Task } from './../../models/task.model';

@Component({
  templateUrl: 'item-details.html',
  providers: [MocksService],
})
export class ItemDetailsPage {
  selectedItem: any;
  task: Task;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mocksService: MocksService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('task');
  }

  add() {
    
    this.mocksService
      .addTask(this.task).then(res => {
        if (res) {
          // TODO
        } else {
          // TODO
        }
      });
  }
}
