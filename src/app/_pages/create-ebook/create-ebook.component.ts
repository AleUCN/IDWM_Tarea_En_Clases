import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEbook } from 'src/app/_interfaces/create-ebook';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-ebook',
  templateUrl: './create-ebook.component.html',
  styles: [],
})
export class CreateEbookComponent implements OnInit {

  forms!: FormGroup;
  error: boolean = false;
  errorMessages: string[] = [];
  validMessages: string[] = [];
  apiUrl: string = 'http://localhost:5000/api/ebook';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forms = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      format: ['', [Validators.required]],
      price: ['', [Validators.required]],
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
      await firstValueFrom(this.http.post(this.apiUrl, ebook));
      console.log('eBook created successfully');
      this.validMessages = ['eBook created successfully'];
      this.createForm();
    } catch (error) {
      console.error(error);
      this.error = true;
      this.errorMessages = ['Failed to create eBook. Please try again.'];
    }
  }

  get titleInvaliddd(){
    return this.forms.get('title')?.invalid && this.forms.get('title')?.touched;
  }

  get authorInvalid(){
    return this.forms.get('author')?.invalid && this.forms.get('author')?.touched;
  }

  get genreInvalid(){
    return this.forms.get('genre')?.invalid && this.forms.get('genre')?.touched;
  }

  get formatInvalid(){
    return this.forms.get('format')?.invalid && this.forms.get('format')?.touched;
  }

  get priceInvalid(){
    return this.forms.get('price')?.invalid && this.forms.get('price')?.touched;
  }
}
