import { Component, OnInit } from '@angular/core';

import * as xml2js from 'xml2js';

import { MetaService } from '../service/meta.service';

interface Column {
  $: { COLUMN_NAME: string, PRIMARY_KEY: string, FOREIGN_KEY: string, MANDATORY: string, INPUT_ALLOWED: string },
  Domain: [{ $: { DATABASE_TYPE: string } }]
}

interface columnValue {
  NAME: string,
  TYPE: string,
  FK: boolean,
  MANDATORY: boolean,
  INPUT_ALLOWED: boolean,
  PK: boolean
}

@Component({
  selector: 'app-crud-grid',
  templateUrl: './crud-grid.component.html',
  styleUrls: ['./crud-grid.component.css']
})
export class CrudGridComponent implements OnInit {

  TablesMeta: any = [];
  ColumnsMeta: any = {};

  columnDefs: any[];
  rowData: any[];

  selectedTable: string;
  pKs: any[];

  private gridApi;

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.loadTablesMeta();
  }

  onTableChange(ob: { value: { tablename: string } }) {
    let selectedTable = ob.value;
    this.selectedTable = selectedTable.tablename;
    return this.metaService.resolveMetaColumns(selectedTable.tablename).subscribe((data: [{ columns: string }]) => {
      const p: xml2js.Parser = new xml2js.Parser();
      p.parseString(data[0].columns, (err, result) => {
        if (err) {
          throw err;
        }
        const allMeta = JSON.parse(JSON.stringify(result, null, 4)); //format your json output
        this.ColumnsMeta = allMeta.Meta.Columns[0].Column;
        this.getColumns(this.ColumnsMeta);
        this.loadTableValues(selectedTable.tablename);
      })
    })
  }

  columnReducer(allColumns: columnValue[], row: Column): columnValue[] {
    const columnName = row.$?.COLUMN_NAME;
    const isPK = row.$?.PRIMARY_KEY === 'Y';
    const type = row.Domain[0]?.$?.DATABASE_TYPE;
    const isFK = row.$?.FOREIGN_KEY === 'Y';
    const isMandatory = row.$?.MANDATORY === 'Y';
    const inputallowed = row.$?.INPUT_ALLOWED === 'Y';
    const jsonValue = {
      NAME: columnName,
      TYPE: type,
      FK: isFK,
      MANDATORY: isMandatory,
      INPUT_ALLOWED: inputallowed,
      PK: isPK
    };
    allColumns.push(jsonValue);

    return allColumns;
  }

  getColumns(metaColumns: Column[]): columnValue[] {
    const columns = metaColumns.reduce(this.columnReducer, []);
    this.columnDefs = columns.map(column => {
      const headerName = column.NAME.charAt(0).toUpperCase() + column.NAME.slice(1);
      const field = column.NAME;
      const sortable = true;
      const filter = true;
      const editable = !column.PK;
      return { headerName, field, sortable, filter, editable };
    });
    this.pKs = this.getPks(columns);
    return columns;
  }

  getPks(columns: columnValue[]): columnValue[] {
    return columns.filter(column => column.PK);
  }

  // Get tables meta
  loadTablesMeta() {
    return this.metaService.resolveMetaTables().subscribe((data: { Resources: [] }) => {
      this.TablesMeta = data.Resources;
    })
  }

  // Get table values
  loadTableValues(tablename: string) {
    return this.metaService.resolveGet(tablename).subscribe((data: {}) => {
      this.rowData = data[tablename.toUpperCase()];
    })
  }

  getSelectedRowData() {
    let selectedData = this.gridApi.getSelectedRows();
    selectedData.forEach(element => {
      const primaryKeysWithValues = this.pKs.reduce((pkString, column) => {
        return pkString.concat(";", column.NAME, "=", element[column.NAME]);
      }, '');
      console.log('delete person with id:', primaryKeysWithValues);
      /**
      this.metaService.resolveDelete(`${this.selectedTable}`, primaryKeysWithValues).subscribe(
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

  onCellValueChanged(event) {
    // we need to create the primaryKeysWithValues in the form of a PK1=value;PK2=value
    const primaryKeysWithValues = this.pKs.reduce((pkString, column) => {
      return pkString.concat(";", column.NAME, "=", event.data[column.NAME]);
    }, '');
    console.log(
      'primaryKeysWithValues: ' + primaryKeysWithValues
    );
    return this.metaService.resolvePut(`${this.selectedTable}`, primaryKeysWithValues, `${event.colDef.field}="${event.newValue}"`).subscribe(
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

  onGridReady(params) {
    this.gridApi = params.api;
  }

}
