import { Component, Inject, OnInit } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { Fonction } from '../../shared/models/fonction.types';
import { Dahira } from '../../shared/models/dahira.types';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DahiraService } from '../../shared/services/dahira.service';
import { MembreService } from '../../shared/services/membre.service';
import { FonctionService } from '../../shared/services/fonction.service';
import * as XLSX from 'xlsx';
import { NotificationService } from 'src/app/pages/shared/services/notification.service';
import { DialogUtil } from 'src/app/pages/shared/util/util';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogConfirmationService } from 'src/app/pages/shared/services/dialog-confirmation.service';


type AOA = any[][];

@Component({
  selector: 'fury-import-membre',
  templateUrl: './import-membre.component.html',
  styleUrls: ['./import-membre.component.scss']
})
export class ImportMembreComponent implements OnInit {
  // dialogConfirmationService: any;
  fonctions: Fonction[];
  dahiras: Dahira[];
  stateCtrlDahira: FormControl = new FormControl();
  filteredStatesDahira: Observable<any[]>;
  filteredStatesFonction: Observable<any[]>;
  stateCtrlFonction: FormControl = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ImportMembreComponent>,
    private dialogConfirmationService: DialogConfirmationService,
    private membreService: MembreService,
    private dahiraSerivice: DahiraService,
    private fonctionService: FonctionService,
    private notificationService: NotificationService,
  ) { }
  mode: 'create' | 'update' = 'create';
  membre: Membre;
  membres: Membre[];
  fonction: Fonction;
  fonctons: Fonction[];
  dahira: Dahira;
  form: FormGroup;
  isFailedToLoad: Boolean = false;
  // tslint:disable-next-line:member-ordering
  data: AOA = null;
  // tslint:disable-next-line:member-ordering
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // tslint:disable-next-line:no-inferrable-types
  fileName: string = 'membres.xlsx';


  ngOnInit(): void {
    this.getDahira();
    this.getFonction();
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    };
    reader.readAsBinaryString(target.files[0]);
  }
  createMembres() {
    const entete = this.data[0];
    // tslint:disable-next-line:triple-equals
    if (entete[0].trim().toLowerCase() !== 'matricule') { return this.notificationService.warn(this.getMessageWarning('Matricule')); }
    if (entete[1].trim().toLowerCase() !== 'prenom') { return this.notificationService.warn(this.getMessageWarning('Prenom')); }
    if (entete[2].trim().toLowerCase() !== 'nom') { return this.notificationService.warn(this.getMessageWarning('Nom')); }
    if (entete[6].trim().toLowerCase() !== 'adresse') { return this.notificationService.warn(this.getMessageWarning('Adresse')); }
    if (entete[3].trim().toLowerCase() !== 'sexe') { return this.notificationService.warn(this.getMessageWarning('Sexe')); }
    if (entete[4].trim().toLowerCase() !== 'telephone') { return this.notificationService.warn(this.getMessageWarning('Téléphone')); }
    if (entete[5].trim().toLowerCase() !== 'scolarite') { return this.notificationService.warn(this.getMessageWarning('Scolarite')); }
    if (entete[8].trim().toLowerCase() !== 'fonction') { return this.notificationService.warn(this.getMessageWarning('Fonction')); }
    if (entete[7].trim().toLowerCase() !== 'dahira') { return this.notificationService.warn(this.getMessageWarning('Dahira')); }
    if (entete[9].trim().toLowerCase() !== 'age') { return this.notificationService.warn(this.getMessageWarning('Age')); }


    const membres: Membre[] = [];
    for (let index = 1; index < this.data.length; index++) {
      const membreInfos = this.data[index];
      const membre: any = {};
      membre.matricule = membreInfos[0];
      membre.prenom = membreInfos[1].trim();
      membre.nom = membreInfos[2].trim();
      membre.sexe = membreInfos[3].trim();
      membre.telephone = membreInfos[4];
      membre.scolarite = membreInfos[5];
      membre.adresse = membreInfos[6].trim();
      membre.dahira = this.getDahiraByNom(membreInfos[7].trim());
      membre.fonction = this.getFonctionByNom(membreInfos[8].trim());
      membre.age = membreInfos[9].trim();

      membres.push(membre);
    }
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.membreService.ajouterTout(membres).subscribe((response) => {
          if (response.status === 200) {
            this.dialogRef.close(response.body);
          }
        });
      } else {
        this.dialogRef.close();
      }
    });
  }
  filterStates(name: string) {
    return this.dahiras.filter(dahira =>
      dahira.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      dahira.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  getMessageWarning(message) {
    return 'La position de la colonne ' + message + ' est incorrecte. Veuillez consulter le template de chargement!';
  }
  getFonctionByNom(nom): Fonction {
    return this.fonctions.find(el => el.nom === nom);
  }
  getDahiraByNom(nom): Dahira {
    return this.dahiras.find(el => el.nom === nom);
  }
  isSetTable(): boolean {
    return this.data != null;
  }
  getDahira() {
    this.dahiraSerivice.listeDahira().subscribe((response) => {
      this.dahiras = response.body;
    },
      (err) => {
      },
      () => {
        this.filteredStatesDahira = this.stateCtrlDahira.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.dahiras.slice())
        );

        if (this.mode === 'update') {
          this.setDahira(this.defaults.dahira);
        }
      }
    );
  }
  getFonction() {
    this.fonctionService.listeFonction().subscribe((response) => {
      this.fonctions = response.body;
    },
      (err) => {
      },
      () => {
        this.filteredStatesFonction = this.stateCtrlFonction.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.fonctions.slice())
        );

        if (this.mode === 'update') {
          this.setFonction(this.defaults.fonction);
        }
      }
    );
  }
  setDahira(dahira) {
    this.dahira = dahira;
    this.stateCtrlDahira.setValue(dahira.code + ' ' + dahira.nom);
  }
  setFonction(fonction) {
    this.stateCtrlFonction.setValue(fonction.code);
    this.fonction = fonction;
  }

}
