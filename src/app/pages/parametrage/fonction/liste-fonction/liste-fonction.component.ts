import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Fonction } from '../../shared/models/fonction.types';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { FonctionService } from '../../shared/services/fonction.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, startWith } from 'rxjs/operators';
import { AddUpdateFonctionComponent } from '../add-update-fonction/add-update-fonction.component';

@Component({
  selector: 'fury-liste-fonction',
  templateUrl: './liste-fonction.component.html',
  styleUrls: ['./liste-fonction.component.scss']
})
export class ListeFonctionComponent implements OnInit {

  fonctions: Fonction[];
  filteredStates: Observable<any[]>;
  stateCtrl: FormControl = new FormControl();
  subject$: ReplaySubject<Fonction[]> = new ReplaySubject<Fonction[]>(
    1
  );
  data$: Observable<Fonction[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Fonction> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: true },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Code', property: 'code', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  constructor(
    private fonctionService: FonctionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFonction();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.fonctions = this.fonctions;
      this.dataSource.data = this.fonctions;
    });
  }
  getFonction() {
    this.fonctionService.listeFonction().subscribe(
      (response) => {
        this.fonctions = response.body;
        console.log('liste fonctions', this.fonctions);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.fonctions);
      }
    );
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  createFonction() {
    this.dialog.open(AddUpdateFonctionComponent, {
      height: '30%',
      width: '30%',
    }).afterClosed().subscribe((fonction: Fonction) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (fonction) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.fonctions.unshift(fonction);
        this.subject$.next(this.fonctions);
      }
    });
  }
  updateFonction(fonction: Fonction) {
    this.dialog.open(AddUpdateFonctionComponent, {
      height: '40%',
      width:  '60%',
      data: fonction,
    // tslint:disable-next-line:no-shadowed-variable
    }).afterClosed().subscribe((fonction) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (fonction) {
        const index = this.fonctions.findIndex(
          (existingFonction) =>
          existingFonction.id === fonction.id
        );
        this.fonctions[index] = fonction;
        this.subject$.next(this.fonctions);
      }
    });
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
