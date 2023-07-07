import { Component, Inject, OnInit } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { Dahira } from '../../shared/models/dahira.types';
import { Fonction } from '../../shared/models/fonction.types';
import { MembreService } from '../../shared/services/membre.service';
import { DahiraService } from '../../shared/services/dahira.service';
import { FonctionService } from '../../shared/services/fonction.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../shared/services/notification.service';
import { DialogUtil, NotificationUtil } from '../../../shared/util/util';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';


@Component({
  selector: 'fury-ajout-membre',
  templateUrl: './ajout-membre.component.html',
  styleUrls: ['./ajout-membre.component.scss']
})
export class AjoutMembreComponent implements OnInit {


  static id = 100;
  form: FormGroup;

  membre: Membre;
  dahira: any;
  fonction: any;
  dahiras: any;
  fonctions: any;
  mode: 'create' | 'update' = 'create';
  filteredStatesDahira: Observable<any[]>;
  stateCtrlDahira: FormControl = new FormControl();
  filteredStatesFonction: Observable<any[]>;
  stateCtrlFonction: FormControl = new FormControl();
  // data$: Observable<Membre[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Membre> | null;
  constructor(
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AjoutMembreComponent>,
    private fb: FormBuilder,
    private membreService: MembreService,
    private dahiraSerivice: DahiraService,
    private fonctionService: FonctionService
  ) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Membre;
    }

    this.form = this.fb.group({
      matricule: [this.defaults.matricule || ''],
      prenom: [this.defaults.prenom || ''],
      nom: this.defaults.nom || '',
      adresse: this.defaults.adresse || '',
      age: this.defaults.age || '',
      sexe: this.defaults.sexe || '',
      telephone: this.defaults.telephone || '',
      scolarite: this.defaults.scolarite || '',
      dahira: this.getDahira(),
      fonction: this.getFonction()
    });
    this.getFonction();
    this.getDahira();

  }
  filterStates(name: string) {
    return this.dahiras.filter(dahira =>
      dahira.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      dahira.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  createMembre() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        const membre: Membre = this.form.value;
        membre.dahira = this.dahira;
        membre.fonction = this.fonction;
        console.log('membre saved ', membre);
        this.membreService.ajouterMembre(membre).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }
        );
      }
    }
    );
  }

  updateMembre() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        let membre: Membre = this.defaults;
        membre = Object.assign(membre, this.form.value);
        membre.fonction = this.fonction;
        membre.dahira = this.dahira;
        this.membreService.modifierMembre(membre).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(membre);
          }, (err) => {
            this.notificationService.success(NotificationUtil.echec);
          }
        );
      }
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createMembre();
    } else if (this.mode === 'update') {
      this.updateMembre();
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
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



  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

}
