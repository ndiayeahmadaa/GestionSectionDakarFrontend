import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembreRoutingModule } from './membre-routing.module';
import { ListeMembreComponent } from './liste-membre/liste-membre.component';
import { FormsModule } from '@angular/forms';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { CustomerCreateUpdateModule } from '../../tables/all-in-one-table/customer-create-update/customer-create-update.module';
import { AjoutMembreComponent } from './ajout-membre/ajout-membre.component';



@NgModule({
  declarations: [ListeMembreComponent, AjoutMembreComponent, ],
  imports: [
    MembreRoutingModule,
    CommonModule,

    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule
  ]
})
export class MembreModule { }
