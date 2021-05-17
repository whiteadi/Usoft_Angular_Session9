import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { PersonsGridComponent } from './persons-grid/persons-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PageNotFoundComponent,
    NewPersonComponent,
    PersonsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
