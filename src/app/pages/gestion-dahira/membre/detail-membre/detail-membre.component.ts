import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Dahira } from '../../shared/models/dahira.types';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DahiraService } from '../../shared/services/dahira.service';

@Component({
  selector: 'fury-detail-membre',
  templateUrl: './detail-membre.component.html',
  styleUrls: ['./detail-membre.component.scss']
})
export class DetailMembreComponent implements OnInit {
  dahiras: Dahira[];
  dahira: Dahira = undefined;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dahiraService: DahiraService,
    private dialogRef: MatDialogRef<DetailMembreComponent>,
  ) { }

  ngOnInit(): void {
  }

}
