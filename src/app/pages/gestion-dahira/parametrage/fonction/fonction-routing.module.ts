import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeFonctionComponent } from './liste-fonction/liste-fonction.component';





const routes: Routes = [
  {
    path: '', component: ListeFonctionComponent
  },
  {
    path: 'liste-fonction', component: ListeFonctionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FonctionRoutingModule {
}
