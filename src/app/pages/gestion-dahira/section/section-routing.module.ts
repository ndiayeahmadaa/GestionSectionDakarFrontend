import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeSectionComponent } from './liste-section/liste-section.component';

const routes: Routes = [
  {
    path: '', component: ListeSectionComponent
  },
  {
    path: 'liste-section', component: ListeSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule {
}
