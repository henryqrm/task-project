import {
    Injectable,
} from '@angular/core';
import {
    Project,
} from './../models/project.model';
import {
    Task
} from './../models/task.model';

let projects: Project[] = [{
    _id: '0',
    name: 'Test',
    tasks: [{
        _id: '0',
        name: 'Name',
        description: 'Descrição',
    }, {
        _id: '1',
        name: 'RRR',
        description: 'GAD',
    }, {
        _id: '2',
        name: 'XXX',
        description: 'CADA',
    },]
}, {
    _id: '1',
    name: 'Oiw',
    tasks: []
}, {
    _id: '2',
    name: 'Much',
    tasks: []
},];
let project: Project;

@Injectable()
export class MocksService {

    getProjects(): Promise<Project[]> {
        return Promise.resolve(projects);
    }
    
    getTask(): Promise<Task[]> {
        if (!project) {
            return Promise.reject(null);
        }
        let index = projects.indexOf(project);
        return Promise.resolve(projects[index].tasks);
    }

    add(project: Project): void {
        projects.push(project);
    }

    addTask(task: Task): Promise<Task> {
        // task.status = false;
        // task.createAt = Date.now();
        let index = projects.indexOf(project);
        if (index > -1) {
            projects[index].tasks.push(task);
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }

    remove(project): void {
        let index = projects.indexOf(project);

        if (index > -1) {
            projects.splice(index, 1);
        }
    }

    removeTask(task): void {
        let indexProject = projects.indexOf(project);
        let index = projects.indexOf(task);

        if (index > -1 && indexProject > -1) {
            projects[indexProject].tasks.splice(index, 1);
        }
    }

    setProject(proj): Promise<Project> {
        project = proj;
        if (project) {
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }

    getTaskComplete(): Promise<Task[]> {
        let indexProject = projects.indexOf(project);
        let tasks: Task[];

        if (indexProject > -1) {
            projects[indexProject].tasks.map(task => {
                if (task.status) {
                    tasks.push(task);
                }
            });
        }
        return Promise.resolve(tasks);
    }
}