import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TextInputComponent } from './_components/text-input/text-input.component';
import { SelectInputComponent } from './_components/select-input/select-input.component';
import { EbookListComponent } from './_pages/ebook-list/ebook-list.component';
import { CreateEbookComponent } from './_pages/create-ebook/create-ebook.component';
import { NavbarComponent } from './_components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    SelectInputComponent,
    CreateEbookComponent,
    EbookListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
