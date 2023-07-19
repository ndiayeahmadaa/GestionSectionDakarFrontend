import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { MembreService } from '../../shared/services/membre.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
// @ts-ignore
import { DialogConfirmationService } from 'src/app/pages/shared/services/dialog-confirmation.service';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map, startWith } from 'rxjs/operators';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { AjoutMembreComponent } from '../ajout-membre/ajout-membre.component';
import { MatDialog } from '@angular/material/dialog';
import { DahiraService } from '../../shared/services/dahira.service';
import { FormControl } from '@angular/forms';
import { DialogUtil, NotificationUtil } from 'src/app/pages/shared/util/util';
import { NotificationService } from 'src/app/pages/shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Fonction } from '../../shared/models/fonction.types';
import { ImportMembreComponent } from '../import-membre/import-membre.component';

@Component({
  selector: 'fury-liste-membre',
  templateUrl: './liste-membre.component.html',
  styleUrls: ['./liste-membre.component.scss', '../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeMembreComponent implements OnInit {
  codeDahira: string;
  codeFonction: string;
  showProgressBar = false;
  membres: Membre[];
  membre: any;
  dahiras: any;
  fonction: Fonction = undefined;
  fonctions: Fonction[] = [];
  filteredFonction: Observable<any[]>;
  fonctionCtrl: FormControl;
  filteredStates: Observable<any[]>;
  stateCtrl: FormControl = new FormControl();
  subject$: ReplaySubject<Membre[]> = new ReplaySubject<Membre[]>(
    1
  );
  pageSize = 4;
  data$: Observable<Membre[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Membre> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: true },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Matricule', property: 'matricule', visible: true, isModelProperty: true },
    { name: 'Prenom', property: 'prenom', visible: true, isModelProperty: true },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Sexe', property: 'sexe', visible: true, isModelProperty: true },
    { name: 'Telephone', property: 'telephone', visible: true, isModelProperty: true },
    { name: 'Scolarite', property: 'scolarite', visible: true, isModelProperty: true },
    { name: 'Adresse', property: 'adresse', visible: true, isModelProperty: true },
    { name: 'Dahira', property: 'dahira', visible: true, isModelProperty: true },
    { name: 'Fonction', property: 'fonction', visible: true, isModelProperty: true },
    { name: 'Age', property: 'age', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  @ViewChild('TABLE') table: ElementRef;
  // displayedColumns = ['matricule', 'prenom', 'nom', 'sexe'];
  constructor(
    private membreService: MembreService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private dahiraSerivice: DahiraService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    // private dialogConfirmationService: DialogConfirmationService,
  ) { }

  ngOnInit(): void {
    /** recup code dahira */
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.membres = this.membres;
      this.dataSource.data = this.membres;
    });
    this.route.paramMap.subscribe((params) => {
      this.codeDahira = params.get('codeDahira');
      this.codeFonction = params.get('codeFonction');
      this.getMembres(this.codeDahira, this.codeFonction);

    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getMembres(codeDahira?, codeFonction?) {
    this.showProgressBar = false;
    this.membreService.listeMembre(codeDahira, codeFonction).subscribe(
      (response) => {
        this.membres = response.body;
        console.log('liste membres', this.membres);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.membres);
        this.showProgressBar = true;
      }
    );
  }
  getMembresImport() {
    this.membreService.getAll().subscribe(
      (response) => {
        this.membres = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.membres);
        this.showProgressBar = true;
      }
    );
  }
  importMembres() {
    this.dialog
      .open(ImportMembreComponent)
      .afterClosed()
      .subscribe((membres: Membre[]) => {
        /**
         * Agent is the updated agent (if the user pressed Save - otherwise it's null)
         */ if (membres) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.membres.unshift(...membres);
          this.subject$.next(this.membres);
        }
      });
  }
  createMembre() {
    this.dialog.open(AjoutMembreComponent, {
      height: '40%',
      width: '60%',
    }).afterClosed().subscribe((membre: Membre) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (membre) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.membres.unshift(membre);
        this.subject$.next(this.membres);
      }
    });
  }
  updateMembre(membre: Membre) {
    this.dialog.open(AjoutMembreComponent, {
      height: '40%',
      width: '60%',
      data: membre,
      // tslint:disable-next-line:no-shadowed-variable
    }).afterClosed().subscribe((membre) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (membre) {
        const index = this.membres.findIndex(
          (existingMembre) =>
            existingMembre.id === membre.id
        );
        this.membres[index] = membre;
        this.subject$.next(this.membres);
      }
    });
  }
  deleteMembre(membre: Membre) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.membreService
          .deleteMembre(membre.matricule)
          .subscribe((response) => {
            this.notificationService.success(NotificationUtil.suppression);
            this.membres.splice(
              this.membres.findIndex(
                (existingMembre) =>
                  existingMembre.id === membre.id
              ),
              1
            );
            this.subject$.next(this.membres);
          }, (err) => {
            this.notificationService.success(NotificationUtil.echec);
          });
      }
    }
    );
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
  filterFonctions(code: string) {
    return this.fonctions.filter(
      (fonction: Fonction) =>
        fonction.code.toLowerCase().indexOf(code.toLowerCase()) === 0 ||
        fonction.nom.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  setFonction(fonction: Fonction) {
    this.fonctionCtrl.setValue(fonction.code);
    this.fonction = fonction;
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
