import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {QuestionaryComponent} from "../questionary/questionary.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'q',
    component: QuestionaryComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
