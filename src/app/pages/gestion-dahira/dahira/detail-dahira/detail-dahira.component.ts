import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Membre } from '../../shared/models/membre.types';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembreService } from '../../shared/services/membre.service';
import { Dahira } from '../../shared/models/dahira.types';

@Component({
  selector: 'fury-detail-dahira',
  templateUrl: './detail-dahira.component.html',
  styleUrls: ['./detail-dahira.component.scss']
})
export class DetailDahiraComponent implements OnInit {
  membres: Membre[];
  membre: Membre = undefined;
  dahira: Dahira;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DetailDahiraComponent>,
    private membreService: MembreService,
  ) { }

  ngOnInit(): void {
    this.getMembre(this.defaults);
  }
  getMembre(dahira: Dahira) {
  this.membreService.getAll().subscribe(response => {
    this.membres = response.body;
    this.membres = this.membres.filter(a => (a.dahira.id === dahira.id));
    this.membres.forEach(element => {
      this.membre = element;
    });
  });
  }

}
