import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { MembreService } from '../../shared/services/membre.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
// @ts-ignore
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-liste-membre',
  templateUrl: './liste-membre.component.html',
  styleUrls: ['./liste-membre.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeMembreComponent implements OnInit {

  membres: Membre[];
  subject$: ReplaySubject<Membre[]> = new ReplaySubject<Membre[]>(
    1
  );
  data$: Observable<Membre[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Membre> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Matricule', property: 'matricule', visible: true, isModelProperty: true },
    { name: 'Prenom', property: 'prenom', visible: false, isModelProperty: true },
    { name: 'Nom', property: 'nom', visible: false, isModelProperty: true },
    { name: 'Sexe', property: 'sexe', visible: true, isModelProperty: true },
    { name: 'Telephone', property: 'telephone', visible: true, isModelProperty: true },
    { name: 'Scolarite', property: 'scolarite', visible: true, isModelProperty: true },
    { name: 'Adresse', property: 'adresse', visible: true, isModelProperty: true },
    // { name: 'Dahira', property: 'dahira', visible: true },
    // { name: 'Foncton', property: 'fonction', visible: true },
  ] as ListColumn[];
  constructor(
    private membreService: MembreService,
    // private dialogConfirmationService: DialogConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getMembres();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.membres = this.membres;
      this.dataSource.data = this.membres;
    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getMembres() {
    this.membreService.listeMembre().subscribe(
      (response) => {
        this.membres = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.membres);
      }
    );
  }
}
