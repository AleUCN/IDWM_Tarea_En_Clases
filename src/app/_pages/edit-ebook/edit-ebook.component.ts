import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CreateEbook } from 'src/app/_interfaces/create-ebook';

@Component({
  selector: 'app-edit-ebook',
  templateUrl: './edit-ebook.component.html',
  styleUrls: []
})
export class EditEbookComponent implements OnInit{

  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];
  validMessages: string[] = [];
  apiUrl: string = 'http://localhost:5000/api/ebook/';
  ebook: CreateEbook = history.state.data;
  id: string = this.activatedRoute.snapshot.paramMap.get('id')!;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    console.log('Edit eBook');
    console.log("state: ",history.state.data);
    console.log("ebook: ",this.ebook);
    this.createForm(this.ebook);
  }

  createForm(ebook: any) {
    this.forms = this.formBuilder.group({
      title: [ebook.title, [Validators.required]],
      author: [ebook.author, [Validators.required]],
      genre: [ebook.genre, [Validators.required]],
      format: [ebook.format, [Validators.required]],
      price: [ebook.price, [Validators.required]],
    });
  }

  async onSubmit() {
    console.log('Form submitted')
    console.log(this.forms.value);
    if (this.forms.invalid) {
      console.log(this.forms.invalid);
      this.error = true;
      this.errorMessages = ['Por Favor complete los campos como se indica.'];
      return;
    }

    try {
      const ebook: CreateEbook = this.forms.value;
      await firstValueFrom(this.http.put(this.apiUrl+this.id, ebook));
      this.validMessages = ['eBook editado correctamente'];
    } catch (error) {
      console.error(error);
      this.error = true;
      this.errorMessages = ['Fallo al editar eBook. Intente de nuevo.'];
    }
  }
}
