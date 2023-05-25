import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Dahira } from '../shared/models/dahira.types';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { DahiraService } from '../shared/services/dahira.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-dahira',
  templateUrl: './dahira.component.html',
  styleUrls: ['./dahira.component.scss']
})
export class DahiraComponent implements OnInit {

  dahiras: Dahira[];
  subject$: ReplaySubject<Dahira[]> = new ReplaySubject<Dahira[]>(
    1
  );
  data$: Observable<Dahira[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Dahira> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    // { name: 'ID', property: 'id', visible: true },
    { name: 'Code', property: 'code', visible: true, isModelProperty: true },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Adresse', property: 'adresse', visible: true, isModelProperty: true },
    { name: 'Telephone', property: 'telephone', visible: true, isModelProperty: true },
    { name: 'Section', property: 'section', visible: true, isModelProperty: true },
  ] as ListColumn[];

  constructor(
    private dahiraService: DahiraService
  ) { }

  ngOnInit(): void {
    this.getDahiras();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.dahiras = this.dahiras;
      this.dataSource.data = this.dahiras;
    });
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getDahiras() {
    this.dahiraService.listeDahira().subscribe(
      (response) => {
        this.dahiras = response.body;
        console.log('liste dahira', this.dahiras);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.dahiras);
      }
    );
  }

}
