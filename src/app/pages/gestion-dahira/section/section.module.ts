import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutOuModifierSectionComponent } from './ajout-ou-modifier-section/ajout-ou-modifier-section.component';
import { ListeSectionComponent } from './liste-section/liste-section.component';
import { SectionRoutingModule } from './section-routing.module';



@NgModule({
  declarations: [AjoutOuModifierSectionComponent, ListeSectionComponent],
  imports: [
    SectionRoutingModule,
    CommonModule
  ]
})
export class SectionModule { }
