import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeMembreComponent } from './liste-membre/liste-membre.component';

const routes: Routes = [
  {
    path: '', component: ListeMembreComponent
  },
  {
    path: 'liste-membre', component: ListeMembreComponent
  },
  {
    path: 'liste-membre/:codeDahira', component: ListeMembreComponent
  },
  {
    path: 'liste-membre/fonction/:codeFonction', component: ListeMembreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembreRoutingModule {
}
