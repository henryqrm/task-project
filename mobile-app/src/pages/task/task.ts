import {
    Component,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    NavController,
    NavParams,
    ToastController,
    AlertController
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

import {
    TaskCreateEditPage
} from './../task-create-edit/task-create-edit';

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

    constructor(public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public mocksService: MocksService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        mocksService
            .getTask()
            .then(tasks => {
                this.tasks = tasks;
            });
    }

    ionViewDidLoad() {}
    taskCreate(event) {
        this.navCtrl.push(TaskCreateEditPage, {});
    }

    taskComplete(event, task) {
        this.mocksService.completeTask(task);
        let toast = this.toastCtrl.create({
            message: 'Parabéns! \o/',
            position: 'bottom',
            duration: 3000,
        });

        toast.present();
    }

    taskEdit(event, task) {
        this.navCtrl.push(TaskCreateEditPage, {
            task,
        });
    }
    taskRemove(event, task) {
        let confirm = this.alertCtrl.create({
            title: 'Excluir',
            message: 'Quer excluir está tarefa?',
            buttons: [{
                text: 'Não'
            }, {
                text: 'Sim',
                handler: () => {
                    this.mocksService.removeTask(task);
                    let toast = this.toastCtrl.create({
                        message: 'Removido com sucesso.',
                        position: 'bottom',
                        duration: 3000,
                    });

                    toast.present();
                }
            }]
        });
        confirm.present();
    }
    taskArchive(event){
        
    }
}