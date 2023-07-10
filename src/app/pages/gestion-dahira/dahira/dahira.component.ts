import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Dahira } from '../shared/models/dahira.types';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { DahiraService } from '../shared/services/dahira.service';
import { filter } from 'rxjs/operators';
import { AjoutOuModifierDahiraComponent } from './ajout-ou-modifier-dahira/ajout-ou-modifier-dahira.component';
import { MatDialog } from '@angular/material/dialog';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';
import { DialogConfirmationService } from '../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DialogUtil, NotificationUtil } from '../../shared/util/util';

@Component({
  selector: 'fury-dahira',
  templateUrl: './dahira.component.html',
  styleUrls: ['./dahira.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class DahiraComponent implements OnInit {

  dahiras: Dahira[];
  subject$: ReplaySubject<Dahira[]> = new ReplaySubject<Dahira[]>(
    1
  );
  data$: Observable<Dahira[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Dahira> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Code', property: 'code', visible: true, isModelProperty: true },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Adresse', property: 'adresse', visible: true, isModelProperty: true },
    { name: 'Telephone', property: 'telephone', visible: true, isModelProperty: true },
    { name: 'Section', property: 'section', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];

  constructor(
    private dahiraService: DahiraService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getDahiras();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.dahiras = this.dahiras;
      this.dataSource.data = this.dahiras;
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getDahiras() {
    this.dahiraService.listeDahira().subscribe(
      (response) => {
        this.dahiras = response.body;
        console.log('liste dahira', this.dahiras);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.dahiras);
      }
    );
  }

  createDahira() {
    this.dialog.open(AjoutOuModifierDahiraComponent).afterClosed().subscribe((dahira: Dahira) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (dahira) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.dahiras.unshift(dahira);
        this.subject$.next(this.dahiras);
      }
    });
  }
  updateDahira(dahira: Dahira) {
    this.dialog.open(AjoutOuModifierDahiraComponent, {
      height: '40%',
      width:  '60%',
      data: dahira,
    // tslint:disable-next-line:no-shadowed-variable
    }).afterClosed().subscribe((dahira) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (dahira) {
        const index = this.dahiras.findIndex(
          (existingMembre) =>
          existingMembre.id === dahira.id
        );
        this.dahiras[index] = dahira;
        this.subject$.next(this.dahiras);
      }
    });
  }
  deleteDahira(dahira: Dahira) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dahiraService
          .deleteDahira(dahira.code)
          .subscribe((response) => {
            this.notificationService.success(NotificationUtil.suppression);
            this.dahiras.splice(
              this.dahiras.findIndex(
                (existingMembre) =>
                  existingMembre.id === dahira.id
              ),
              1
            );
            this.subject$.next(this.dahiras);
          },  (err) => {
            this.notificationService.success(NotificationUtil.echec);
          });
      }
    }
    );
  }
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }



}
