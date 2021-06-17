import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsComponent } from './persons/persons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { PersonsGridComponent } from './persons-grid/persons-grid.component';
import { CrudGridComponent } from './crud-grid/crud-grid.component';
import { PersonComponent } from './person/person.component'

const routes: Routes = [{
  path: 'persons',
  component: PersonsComponent
},
{ path: 'new-person', component: NewPersonComponent },
{ path: 'crud', component: CrudGridComponent },
{ path: 'crudPerson', component: PersonsGridComponent },
{ path: 'person', component: PersonComponent },
{ path: '', redirectTo: '/persons', pathMatch: 'full' },
{
  path: '**',
  component: PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
