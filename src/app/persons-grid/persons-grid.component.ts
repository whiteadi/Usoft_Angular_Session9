import { Component, OnInit } from '@angular/core';

import { PersonsService } from '../service/persons.service';
import { MetaService } from '../service/meta.service';

@Component({
  selector: 'app-persons-grid',
  templateUrl: './persons-grid.component.html',
  styleUrls: ['./persons-grid.component.css']
})
export class PersonsGridComponent implements OnInit {

  private gridApi;

  rowData: any = [];
  columnDefs: any = [];

  constructor(private personsService: PersonsService, private metaService: MetaService) { }

  ngOnInit(): void {
    this.loadPersons();
    this.loadColumnDefs();
  }

  loadPersons() {
    return this.personsService.resolvePersons().subscribe((data: { PERSON: [] }) => {
      this.rowData = data.PERSON;
    })
  }

  loadColumnDefs() {
    return this.metaService.resolveMeta('PERSON').subscribe((data: { columns: [{ name: string, pk: string }] }) => {
      this.columnDefs = data.columns.map(column => {
        const headerName = column.name.charAt(0).toUpperCase() + column.name.slice(1);
        const field = column.name;
        const sortable = true;
        const filter = true;
        const editable = column.pk !== 'yes';
        return { headerName, field, sortable, filter, editable };
      });
    })
  }


  onCellValueChanged(event) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue + ' and Personid= ' + event.data.PERSON_ID
    );
    return this.metaService.resolvePut('PERSON', 'PERSON_ID', event.data.PERSON_ID, `${event.colDef.field}="${event.newValue}"`).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body",
          val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      });
  }

  getSelectedRowData() {
    let selectedData = this.gridApi.getSelectedRows();
    selectedData.forEach(element => {
      console.log('delete person with id:', element.PERSON_ID);
      /**
      this.metaService.resolveDelete('PERSON', 'PERSON_ID', element.PERSON_ID).subscribe(
        (val) => {
          console.log("DELETE call successful value returned in body",
            val);
        },
        response => {
          console.log("DELETE call in error", response);
        },
        () => {
          console.log("The DELETE observable is now completed.");
        });
         */
    });
    return selectedData;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }


}
