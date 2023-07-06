import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutOuModifierSectionComponent } from './ajout-ou-modifier-section/ajout-ou-modifier-section.component';
import { ListeSectionComponent } from './liste-section/liste-section.component';
import { SectionRoutingModule } from './section-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CustomerCreateUpdateModule } from '../../tables/all-in-one-table/customer-create-update/customer-create-update.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';



@NgModule({
  declarations: [AjoutOuModifierSectionComponent, ListeSectionComponent],
  imports: [
    SectionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule
  ]
})
export class SectionModule { }
