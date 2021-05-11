import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MetaService } from '../service/meta.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  PersonMeta: any = {};

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.loadPersonsMeta();
  }

  // Get meta data for PERSON table
  loadPersonsMeta() {
    return this.metaService.resolveMeta('PERSON').subscribe((data: {}) => {
      this.PersonMeta = data;
    })
  }

  reduce(obj: object, initialValue: string) {
    return Object.entries(obj).reduce(
      (prev, [key, value]) => prev.concat(
        key,
        '="',
        value,
        '" '
      ),
      initialValue
    )
  };

  onSubmit(myform: NgForm) {
    const rowData = this.reduce(myform.value, "");
    return this.metaService.resolvePost('PERSON', rowData).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

}
