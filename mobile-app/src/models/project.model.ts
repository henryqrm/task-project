import {Task} from './task.model';
export class Project {
  _id: string;
  name: string;
  tasks: Array<Task>;
}