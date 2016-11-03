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
    selector: 'page-task-archive',
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

    isEmpty() {
        let length = 0;
        if(!this.tasks){
            return true;
        }
        this.tasks.map(task=>{
            if(task.status === 'completed'){
                length += 1;
            }
        })
        return length === 0 ? true : false;
    };

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