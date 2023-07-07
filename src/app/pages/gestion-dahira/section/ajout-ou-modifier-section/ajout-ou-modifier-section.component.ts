import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Section } from '../../shared/models/section.types';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/pages/shared/services/notification.service';
import { DialogConfirmationService } from 'src/app/pages/shared/services/dialog-confirmation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SectionService } from '../../shared/services/section.service';
import { DialogUtil, NotificationUtil } from 'src/app/pages/shared/util/util';

@Component({
  selector: 'fury-ajout-ou-modifier-section',
  templateUrl: './ajout-ou-modifier-section.component.html',
  styleUrls: ['./ajout-ou-modifier-section.component.scss']
})
export class AjoutOuModifierSectionComponent implements OnInit {

  static id = 100;
  form: FormGroup;

  section: Section;
  mode: 'create' | 'update' = 'create';
  filteredStatesDahira: Observable<any[]>;
  stateCtrlDahira: FormControl = new FormControl();
  filteredStatesFonction: Observable<any[]>;
  stateCtrlFonction: FormControl = new FormControl();
  // data$: Observable<Membre[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Section> | null;

  constructor(
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AjoutOuModifierSectionComponent>,
    private fb: FormBuilder,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Section;
    }

    this.form = this.fb.group({
      // id: [AjoutOuModifierSectionComponent.id++],
      code: [this.defaults.code || ''],
      nom: this.defaults.nom || '',
      adresse: this.defaults.adresse || '',
      telephone: this.defaults.telephone || '',
    });
  }

  createSection() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    const section: Section = this.form.value;
    console.log('section saved ', this.section);
    this.sectionService.ajouterSection(section).subscribe((response) => {
      this.notificationService.success(NotificationUtil.ajout);
      this.dialogRef.close(response.body);
    }
    );
  }
}
    );
  }
  updateSection() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        let section: Section = this.defaults;
        section = Object.assign(section, this.form.value);
        // dahira.section = this.section;
        // membre.dahira = this.dahira;
        this.sectionService.modifierSection(section).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(section);
          }, (err) => {
            this.notificationService.success(NotificationUtil.echec);
          }
        );
      }
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createSection();
    } else if (this.mode === 'update') {
      this.updateSection();
    }
  }
  isCreateMode() {
    return this.mode === 'create';
  }
  isUpdateMode() {
    return this.mode === 'update';
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
