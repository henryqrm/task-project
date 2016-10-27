import {
    Component
} from '@angular/core';
import {
    NavController,
    ToastController,
    AlertController
} from 'ionic-angular';
import {
    Project
} from './project.model';

@Component({
    selector: 'page-project',
    templateUrl: 'project.html'
})
export class ProjectsPage {

    projects: Array < Project > ;
    newProject: Project;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
        this.projects = [{
            _id: '1',
            name: 'Test',
        }, {
            _id: '2',
            name: 'App Hybrid',
        }, ];
    }

    ionViewDidLoad() {

    }
    add(name) {
        if (name.value !== undefined && name.value !== '') {
            this.newProject = {
                _id: this.projects.length.toString(),
                name: name.value,
            }
            this.projects.push(this.newProject);
            name.value = null;
        }
    }
    remove(project) {
        let confirm = this.alertCtrl.create({
            title: 'Tem certeza?',
            message: 'Esta ação irá excluir todas as tarefas deste projeto',
            buttons: [{
                text: 'Não'
            }, {
                text: 'Sim',
                handler: () => {
                    let index = this.projects.indexOf(project);

                    if (index > -1) {
                        this.projects.splice(index, 1);
                    }

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

}