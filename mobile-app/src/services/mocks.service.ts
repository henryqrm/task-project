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
        status: false,
        priority: 3,
        limitAt: Date.now(),
        createAt: Date.now()
    }, ]
}, {
    _id: '1',
    name: 'Oiw',
    tasks: []
}, {
    _id: '2',
    name: 'Much',
    tasks: []
}, ];
let project: Project;

@Injectable()
export class MocksService {

    getProjects(): Promise < Project[] > {
        return Promise.resolve(projects);
    }

    getTask(): Promise < Task[] > {
        // let indexProject = projects.indexOf(project);
        // let tasks: Task[];

        // if (indexProject > -1) {
        //     projects[indexProject].tasks.map(task => {
        //         console.log('task',task);
                
        //         if (!task.status) {
        //             console.log('task',task);
                    
        //             tasks.push(task);
        //         }
        //     });
        // }
        // return Promise.resolve(tasks);

        if (!project) {
            return Promise.reject(null);
        }
        let index = projects.indexOf(project);
        return Promise.resolve(projects[index].tasks);
    }

    add(project: Project): void {
        projects.push(project);
    }

    addTask(task: Task): Promise < Task > {
        if (task._id) {
            return this.editTask(task);
        }
        let indexProject = projects.indexOf(project);
        task.status = false;
        task.createAt = Date.now();
        task._id = projects[indexProject].tasks.length.toString();
        let index = projects.indexOf(project);
        if (index > -1) {
            projects[index].tasks.push(task);
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }

    editTask(task: Task): Promise < Task > {
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);
        projects[indexProject].tasks[index] = task;
        return Promise.resolve(true);
    }

    remove(project): void {
        let index = projects.indexOf(project);

        if (index > -1) {
            projects.splice(index, 1);
        }
    }

    removeTask(task): void {
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);

        if (index > -1 && indexProject > -1) {
            projects[indexProject].tasks.splice(index, 1);
        }
    }

    completeTask(task){
        let indexProject = projects.indexOf(project);
        let index = projects[indexProject].tasks.indexOf(task);

        projects[indexProject].tasks[index].status = true;
    }
    setProject(proj): Promise < Project > {
        project = proj;
        if (project) {
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    }

    getTasksComplete(): Promise < Task[] > {
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