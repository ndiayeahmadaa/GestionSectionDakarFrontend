import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DahiraComponent } from './dahira.component';
import { DahiraRoutingModule } from './dahira-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CustomerCreateUpdateModule } from '../../tables/all-in-one-table/customer-create-update/customer-create-update.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { AjoutOuModifierDahiraComponent } from './ajout-ou-modifier-dahira/ajout-ou-modifier-dahira.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DahiraComponent, AjoutOuModifierDahiraComponent],
  imports: [
    DahiraRoutingModule,
    CommonModule,
    FormsModule,

    MaterialModule,
    ReactiveFormsModule,
    FurySharedModule,

     // Core
     ListModule,
     CustomerCreateUpdateModule,
     BreadcrumbsModule

  ]
})
export class DahiraModule { }
