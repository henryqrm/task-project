import {
    Component
} from '@angular/core';

import {
    DatePicker
} from 'ionic-native';

import {
    NavController,
    NavParams,
    Nav
} from 'ionic-angular';
import {
    MocksService
} from './../../services/mocks.service';

import {
    Task
} from './../../models/task.model';

import {
    TaskPage
} from './../task/task';

@Component({
    selector: 'page-task-create-edit',
    templateUrl: 'task-create-edit.html',
    providers: [MocksService],
})
export class TaskCreateEditPage {
    // @ViewChild(Nav) nav: Nav;

    task: Task;
    isEdit: Task;

    constructor(public navCtrl: NavController, public navParams: NavParams, public mocksService: MocksService) {

        this.task = navParams.get('task');
        if (!this.task) {
            this.task = new Task();
        }
    }

    onSubmit(a) {
        this.mocksService
            .addTask(this.task)
            .then(res => {
                // this.nav.setRoot(TaskPage);
                this.navCtrl.pop();
            });
    }
    getData() {
        DatePicker.show({
            date: new Date(),
            mode: 'date'
        }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
        );
    }
}