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
  ata$: Observable<Fonction[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Fonction> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: true },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Code', property: 'code', visible: true, isModelProperty: true },
  ] as ListColumn[];
  constructor(
    private fonctionService: FonctionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

}
