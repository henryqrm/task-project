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
} from '../../services/mocks.service';

@Component({
    templateUrl: 'task-archive.html',
    providers: [MocksService],
})

export class TaskArchivePage {
    tasks: any;
    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public mocksService: MocksService) {
    }

    ionViewDidLoad() {
        this.mocksService.getTask('completed').then(tasks => {
            this.tasks = tasks;
        });
    }
    taskRestore(task, index) {
        this.mocksService
            .completeTask(task);
        this.tasks.splice(index, 1);
        let toast = this.toastCtrl.create({
            message: 'Restaurado com sucesso.',
            position: 'bottom',
            duration: 3000,
        });

        toast.present();
    }

}