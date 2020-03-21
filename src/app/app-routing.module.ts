import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {QuestionaireComponent} from './questionaire/questionaire.component';
import {SimulationComponent} from './simulation/simulation.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 's', component: SimulationComponent },
  { path: 'q', component: QuestionaireComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
