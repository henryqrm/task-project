import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ProjectsPage } from '../pages/project/project';
import { TaskPage } from '../pages/task/task';
import { TaskCreateEditPage } from './../pages/task-create-edit/task-create-edit';
import { TaskArchivePage } from './../pages/task-archive/task-archive';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ProjectsPage,
    TaskPage,
    TaskCreateEditPage,
    TaskArchivePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ProjectsPage,
    TaskPage,
    TaskCreateEditPage,
    TaskArchivePage,
  ],
  providers: []
})
export class AppModule {}
