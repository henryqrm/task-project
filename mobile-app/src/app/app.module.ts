import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ProjectsPage } from '../pages/project/project';
import { TaskPage } from '../pages/task/task';
import { TaskCreateEditPage } from './../pages/task-create-edit/task-create-edit';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ProjectsPage,
    TaskPage,
    TaskCreateEditPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ProjectsPage,
    TaskPage,
    TaskCreateEditPage,
  ],
  providers: []
})
export class AppModule {}
