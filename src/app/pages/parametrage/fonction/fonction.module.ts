import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUpdateFonctionComponent } from './add-update-fonction/add-update-fonction.component';
import { ListeFonctionComponent } from './liste-fonction/liste-fonction.component';
import { FonctionRoutingModule } from './fonction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CustomerCreateUpdateModule } from '../../tables/all-in-one-table/customer-create-update/customer-create-update.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [AddUpdateFonctionComponent, ListeFonctionComponent],
  imports: [
    FonctionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule
  ]
})
export class FonctionModule { }
