import {
    Injectable,
} from '@angular/core';
import {
    Project,
} from './../models/project.model';
import {
    Task
} from './../models/task.model';

import {
    Vibration
} from 'ionic-native';


import {
    Storage
} from '@ionic/storage';

let projects: Project[] = [];
let project: Project;
let localstorage: Storage;


@Injectable()
export class MocksService {

    load(): Promise < boolean > {
        if (localStorage.getItem('task')) {
            projects = JSON.parse(localStorage.getItem('task'));
        } else {
            projects = [];
        }
        return Promise.resolve(true);
    }

    getProjects(): Promise < Project[] > {
        return Promise.resolve(projects);
    }

    getProject(): Promise < Project > {
        return Promise.resolve(project);
    }

    save() {
        Vibration.vibrate([100,100,200]);
        localStorage.setItem('task', JSON.stringify(projects));
    }

    getTask(): Promise < Task[] > {
        if (!project) {
            return Promise.reject(null);
        }
        let index = projects.indexOf(project);

        return Promise.resolve(projects[index].tasks);
    }

    add(project: Project): void {
        projects.push(project);
        this.save();
    }

    addTask(task: Task): Promise < Task > {
        if (task._id) {
            return this.editTask(task);
        }
        let indexProject = projects.indexOf(project);
        task.status = 'pending';
        task.createAt = Date.now();
        task._id = projects[indexProject].tasks.length.toString();
        let index = projects.indexOf(project);
        if (index > -1) {
            projects[index].tasks.push(task);
            this.save();
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }

    editTask(task: Task): Promise < Task > {
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);
        projects[indexProject].tasks[index] = task;
        this.save();
        return Promise.resolve(true);
    }

    remove(project): void {
        let index = projects.indexOf(project);

        if (index > -1) {
            projects.splice(index, 1);
            this.save();
        }
    }

    removeTask(task): void {
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);

        if (index > -1 && indexProject > -1) {
            this.save();
            projects[indexProject].tasks.splice(index, 1);
        }
    }

    completeTask(task) {
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);

        if (task.status === 'pending') {
            projects[indexProject].tasks[index].status = 'completed';
        } else {
            projects[indexProject].tasks[index].status = 'pending';
        }
        this.save();
    }
    setProject(proj): Promise < Project > {
        project = proj;
        if (project) {
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }
}