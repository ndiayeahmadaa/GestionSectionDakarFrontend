import { Component, Inject , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Fonction } from 'src/app/pages/gestion-dahira/shared/models/fonction.types';
import { DialogConfirmationService } from 'src/app/pages/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/pages/shared/services/notification.service';
import { FonctionService } from '../../shared/services/fonction.service';
import { DialogUtil, NotificationUtil } from 'src/app/pages/shared/util/util';

@Component({
  selector: 'fury-add-update-fonction',
  templateUrl: './add-update-fonction.component.html',
  styleUrls: ['./add-update-fonction.component.scss']
})
export class AddUpdateFonctionComponent implements OnInit {

  static id = 100;
  form: FormGroup;

  fonction: Fonction;
  mode: 'create' | 'update' = 'create';
  // filteredStatesDahira: Observable<any[]>;
  // stateCtrlDahira: FormControl = new FormControl();
  // filteredStatesFonction: Observable<any[]>;
  // stateCtrlFonction: FormControl = new FormControl();
  dataSource: MatTableDataSource<Fonction> | null;

  constructor(
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddUpdateFonctionComponent>,
    private fb: FormBuilder,
    private fonctionService: FonctionService
  ) { }

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Fonction;
    }

    this.form = this.fb.group({
      id: [AddUpdateFonctionComponent.id++],
      code: [this.defaults.code || ''],
      nom: this.defaults.nom || '',
    });
  }
  createFonction() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    const fonction: Fonction = this.form.value;
    console.log('fonction saved ', fonction);
    this.fonctionService.ajouterFonction(fonction).subscribe((response) => {
      this.notificationService.success(NotificationUtil.ajout);
      this.dialogRef.close(response.body);
    }
    );
  }
}
    );
  }
  save() {
    if (this.mode === 'create') {
      this.createFonction();
    }
  }
  isCreateMode() {
    return this.mode === 'create';
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
