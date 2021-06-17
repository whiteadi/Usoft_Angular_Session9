import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from '../service/persons.service';

interface PERSON {
  FIRST_NAME: string,
  FAMILY_NAME: string,
  EMAIL: string,
  ADDRESS: string,
  AREA_CODE: string,
  CITY: string,
  BIRTH_DATE: string
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  personId: string;
  Person: PERSON;

  constructor(private route: ActivatedRoute, private personsService: PersonsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.personId = params['personId'];
      this.loadPerson();
    });
  }

  loadPerson() {
    return this.personsService.resolvePerson(this.personId).subscribe((data: { data: { person: PERSON } }) => {
      this.Person = data.data.person;
    })
  }

}
