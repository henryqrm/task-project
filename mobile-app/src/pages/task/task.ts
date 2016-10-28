import {
    Component
} from '@angular/core';
import {
    NavController,
    NavParams
} from 'ionic-angular';
import {
    ItemDetailsPage
} from '../item-details/item-details';

import {
    MocksService
} from './../../services/mocks.service';
import {
    Task
} from './../../models/task.model';

@Component({
    selector: 'page-task',
    templateUrl: 'task.html',
    providers: [MocksService],
})
export class TaskPage {
    tasks: Array < Task > ;
    selectedItem: any;
    icons: string[];
    items: Array < {
        title: string,
        note: string,
        icon: string
    } > ;

    constructor(public navCtrl: NavController, public navParams: NavParams, public mocksService: MocksService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'
        ];

        this.items = [];
        for (let i = 1; i < 2; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }

        mocksService
            .getTask()
            .then(tasks => {
                this.tasks = tasks;
            });
    }

    ionViewDidLoad() {}

    taskTapped(task) {
        this.navCtrl.push(ItemDetailsPage, {
            task: task
        });
    }
    taskCreate(event) {

    }
    taskComplete(event, task) {
        event.stopPropagation();
    }
    taskEdit(event, task) {

    }
    taskRemove(event, task) {

    }
}