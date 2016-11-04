import {
    Component
} from '@angular/core';

import {
    NavController,
    ToastController,
    NavParams
} from 'ionic-angular';
import {
    MocksService
} from './../../services/mocks.service';

import {
    Task
} from './../../models/task.model';

@Component({
    selector: 'page-task-create-edit',
    templateUrl: 'task-create-edit.html',
    providers: [MocksService],
})
export class TaskCreateEditPage {
    // @ViewChild(Nav) nav: Nav;

    task: Task;
    isEdit: Task;

    constructor(public navCtrl: NavController, public navParams: NavParams, public mocksService: MocksService, public toastCtrl: ToastController) {

        this.task = navParams.get('task');
        if (!this.task) {
            this.task = new Task();
        }
    }

    onSubmit(a) {
        this.mocksService
            .addTask(this.task)
            .then(res => {
                this.navCtrl.pop();
            });
    }
}