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
import { DetailDahiraComponent } from './detail-dahira/detail-dahira.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [DahiraComponent, AjoutOuModifierDahiraComponent, DetailDahiraComponent],
  imports: [
    DahiraRoutingModule,
    CommonModule,
    FormsModule,

    MaterialModule,
    ReactiveFormsModule,
    FurySharedModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
     // Core
     ListModule,
     CustomerCreateUpdateModule,
     BreadcrumbsModule,
     BreadcrumbsModule,
     ReactiveFormsModule,

  ]
})
export class DahiraModule { }
