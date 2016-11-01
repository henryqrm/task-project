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
    project: string;
    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public mocksService: MocksService) {}

    ionViewDidLoad() {
        this.mocksService
            .getProject()
            .then(project => {
                this.project = project.name;
            })
        this.mocksService
            .getTask()
            .then(tasks => {
                this.tasks = tasks;
            });
    }
    taskRestore(task, index) {
        this.mocksService
            .completeTask(task);
        let toast = this.toastCtrl.create({
            message: 'Restaurado com sucesso.',
            position: 'bottom',
            duration: 3000,
        });

        toast.present();
    }

}