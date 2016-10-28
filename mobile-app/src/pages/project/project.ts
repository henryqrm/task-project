import {
    Component
} from '@angular/core';
import {
    NavController,
    ToastController,
    AlertController
} from 'ionic-angular';
import {
    MocksService
} from './../../services/mocks.service';
import {
    Project
} from './../../models/project.model';

@Component({
    selector: 'page-project',
    templateUrl: 'project.html',
    providers: [],
})
export class ProjectsPage {

    projects: Array < Project > ;
    newProject: Project;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public mocksService: MocksService) {}

    ionViewDidLoad() {
        this.mocksService
            .getProjects()
            .then(projects => {
                this.projects = projects;
            });
    }
    add(name) {
        if (name.value !== undefined && name.value !== '') {
            this.newProject = {
                _id: this.projects.length.toString(),
                name: name.value,
                tasks: [],
            }
            this.mocksService.add(this.newProject);
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
                    this.mocksService.remove(project);
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