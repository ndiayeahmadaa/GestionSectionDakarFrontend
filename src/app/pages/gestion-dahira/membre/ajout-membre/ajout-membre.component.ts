import { Component, Inject, OnInit } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { Dahira } from '../../shared/models/dahira.types';
import { Fonction } from '../../shared/models/fonction.types';
import { MembreService } from '../../shared/services/membre.service';
import { DahiraService } from '../../shared/services/dahira.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


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
  fonction: Fonction;
  mode: 'create' | 'update' = 'create';
  dahiras: any;
  filteredStates: Observable<any[]>;
  stateCtrl: FormControl = new FormControl();
  // data$: Observable<Membre[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Membre> | null;
  constructor(

    @Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<AjoutMembreComponent>,
              private fb: FormBuilder,
    private membreService: MembreService,
    private dahiraSerivice: DahiraService,
  ) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Membre;
    }

    this.form = this.fb.group({
      id: [AjoutMembreComponent.id++],
      matricule: [this.defaults.matricule || '', ],
      prenom: [this.defaults.prenom || ''],
      nom: this.defaults.nom || '',
      sexe: this.defaults.sexe || '',
      telephone: this.defaults.telephone || '',
      scolarite: this.defaults.scolarite || '',
      // dahira: this.defaults.code
    });
    this.getDahira();
  }
  filterStates(name: string) {
    return this.dahiras.filter(dahira =>
      dahira.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      dahira.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  createMembre() {

    const membre: Membre = this.form.value;
    this.membreService.ajouterMembre(membre).subscribe();

  }

  save() {
    if (this.mode === 'create') {
      this.createMembre();
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }
  getDahira() {
    this.dahiraSerivice.listeDahira().subscribe((response) => {
      this.dahiras = response.body;
    },
    (err) => {
    },
    () => {
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.dahiras.slice())
      );
    }
    );
      }
      setDahira(dahira) {
        this.dahira = dahira;
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
