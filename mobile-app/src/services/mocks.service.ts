import {
    Injectable,
} from '@angular/core';
import {
    Project,
} from './../models/project.model';

const projects: Project[] = [{
    _id: '0',
    name: 'Test'
}, {
    _id: '1',
    name: 'Oiw'
}, {
    _id: '2',
    name: 'Much'
}, ];

@Injectable()
export class MocksService {

    getProjects(): Promise < Project[] > {
        return Promise.resolve(projects);
    }
    add(project): void {
        projects.push(project);
    }
    remove(project): void {
        let index = projects.indexOf(project);

        if (index > -1) {
            projects.splice(index, 1);
        }
    }
}