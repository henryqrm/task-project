import {
    Component,
    ViewChild
} from '@angular/core';

import {
    Platform,
    MenuController,
    Nav
} from 'ionic-angular';

import {
    StatusBar
} from 'ionic-native';

import {
    HelloIonicPage
} from '../pages/hello-ionic/hello-ionic';
import {
    ListPage
} from '../pages/list/list';
import {
    ProjectsPage
} from '../pages/project/project';
import {
    TaskPage
} from './../pages/task/task';
import {
    MocksService
} from './../services/mocks.service'


@Component({
    templateUrl: 'app.html',
    providers: [MocksService],
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = HelloIonicPage;
    pages: Array < {
        title: string,
        component: any
    } > ;
    projects: any;

    constructor(public platform: Platform, public menu: MenuController, public mocksService: MocksService) {
        this.initializeApp();

        // set our app's pages
        this.pages = [{
            title: 'Hello Ionic',
            component: HelloIonicPage
        }, {
            title: 'My First List',
            component: ListPage
        }, {
            title: 'Projetos',
            component: ProjectsPage
        }, {
            title: 'Tarefa',
            component: TaskPage
        }];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    getProjects(): void {
        this.mocksService
            .getProjects()
            .then(projects => {
                this.projects = projects;
            });
    }

    ngOnInit(): void {
        this.getProjects();
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    openProject(project) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.mocksService
            .setProject(project)
            .then(bool => {
                if (bool) {
                    // navigate to the new page if it is not the current page
                    this.nav.setRoot(TaskPage);
                } else {
                    // TODO: fazer
                }
            })
    }
}