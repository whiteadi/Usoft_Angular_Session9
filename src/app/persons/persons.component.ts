import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../service/persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  Person: any = [];

  constructor(private personsService: PersonsService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  // Get persons list
  loadPersons() {
    return this.personsService.resolvePersons().subscribe((data: {}) => {
      this.Person = data;
    })
  }

}
