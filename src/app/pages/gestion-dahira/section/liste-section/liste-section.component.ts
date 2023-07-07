import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Section } from '../../shared/models/section.types';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SectionService } from '../../shared/services/section.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AjoutOuModifierSectionComponent } from '../ajout-ou-modifier-section/ajout-ou-modifier-section.component';

@Component({
  selector: 'fury-liste-section',
  templateUrl: './liste-section.component.html',
  styleUrls: ['./liste-section.component.scss']
})
export class ListeSectionComponent implements OnInit {
  sections: Section[];
  subject$: ReplaySubject<Section[]> = new ReplaySubject<Section[]>(
    1
  );
  data$: Observable<Section[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Section> | null;

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
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];

  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSections();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((agents) => {
      this.sections = this.sections;
      this.dataSource.data = this.sections;
    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getSections() {
    this.sectionService.listeSection().subscribe(
      (response) => {
        this.sections = response.body;
        console.log('liste dahira', this.sections);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.sections);
      }
    );
  }
  createSection() {
    this.dialog.open(AjoutOuModifierSectionComponent, {
      height: '30%',
      width:  '50%',
    }).afterClosed().subscribe((section: Section) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (section) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.sections.unshift(section);
        this.subject$.next(this.sections);
      }
    });
  }
  updateSection(section: Section) {
    this.dialog.open(AjoutOuModifierSectionComponent, {
      height: '40%',
      width:  '60%',
      data: section,
    // tslint:disable-next-line:no-shadowed-variable
    }).afterClosed().subscribe((section) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (section) {
        const index = this.sections.findIndex(
          (existingSection) =>
          existingSection.id === section.id
        );
        this.sections[index] = section;
        this.subject$.next(this.sections);
      }
    });
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
