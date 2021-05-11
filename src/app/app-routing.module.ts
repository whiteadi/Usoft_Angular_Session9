import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonsComponent } from './persons/persons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPersonComponent } from './new-person/new-person.component';

const routes: Routes = [{
  path: 'persons',
  component: PersonsComponent
},
{ path: 'new-person', component: NewPersonComponent },
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
