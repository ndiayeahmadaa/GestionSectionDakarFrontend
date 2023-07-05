import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dahira } from '../../shared/models/dahira.types';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DahiraService } from '../../shared/services/dahira.service';
import { SectionService } from '../../shared/services/section.service';
import { CommonModule } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from 'src/@fury/animations/scale-in.animation';


@Component({
  selector: 'fury-ajout-ou-modifier-dahira',
  templateUrl: './ajout-ou-modifier-dahira.component.html',
  styleUrls: ['./ajout-ou-modifier-dahira.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation]
})
export class AjoutOuModifierDahiraComponent implements OnInit {

  static id = 100;
  form: FormGroup;
  sections: any;
  section: any;
  dahira: Dahira;
  mode: 'create' | 'update' = 'create';
  filteredStatesDahira: Observable<any[]>;
  stateCtrlDahira: FormControl = new FormControl();
  filteredStatesSection: Observable<any[]>;
  stateCtrlSection: FormControl = new FormControl();
  dataSource: MatTableDataSource<Dahira> | null;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AjoutOuModifierDahiraComponent>,
    private fb: FormBuilder,
    private dahiraSerivice: DahiraService,
    private sectionService: SectionService) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Dahira;
    }
    this.form = this.fb.group({
      id: [AjoutOuModifierDahiraComponent.id++],
      code: [this.defaults.code || '', ],
      nom: [this.defaults.nom || ''],
      adresse: this.defaults.adresse || '',
      telephone: this.defaults.telephone || '',
      // dahira: this.defaults.code
    });
    this.getSection();

  }
  filterStates(name: string) {
    return this.sections.filter(section =>
      section.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      section.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  createDahira() {

    const dahira: Dahira = this.form.value;
    dahira.section = this.section;
    console.log('membre saved ', dahira);
    this.dahiraSerivice.ajouterDahira(dahira).subscribe((response) => {
      this.dialogRef.close(response.body);
    });

  }
  save() {
    if (this.mode === 'create') {
      this.createDahira();
    }
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  getSection() {
    this.sectionService.listeSection().subscribe((response) => {
      this.sections = response.body;
    },
      (err) => {
      },
      () => {
        this.filteredStatesSection = this.stateCtrlSection.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.sections.slice())
        );
      }
    );
  }
  setSection(section) {
    this.section = section;
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
