import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEbookComponent } from './_pages/create-ebook/create-ebook.component';
import { EbookListComponent } from './_pages/ebook-list/ebook-list.component';
import { EditEbookComponent } from './_pages/edit-ebook/edit-ebook.component';


const routes: Routes = [
  { path: '', component: EbookListComponent },
  { path: 'create', component: CreateEbookComponent },
  { path: 'edit/:id', component: EditEbookComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
