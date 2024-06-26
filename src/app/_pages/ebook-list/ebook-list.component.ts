import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';


interface Ebook {
  id: number;
  title: string;
  author: string;
  genre: string;
  format: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styles: [
  ],

})
export class EbookListComponent implements OnInit {
  apiUrl: string = environment.apiUrl;
  ebooks: Ebook[] = [];
  hidden: boolean = true;
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: false
  }
  search = {
    genre: '',
    author: '',
    format: ''
  };

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.http.get<Ebook[]>(this.apiUrl).subscribe((ebooks) => {
      this.ebooks = ebooks;
      console.log(this.ebooks);
    });
  }

  fetchEbooks(): void {
    let params = new HttpParams();
    if (this.search.genre) {
      params = params.set('genre', this.search.genre);
    }
    if (this.search.author) {
      params = params.set('author', this.search.author);
    }
    if (this.search.format) {
      params = params.set('format', this.search.format);
    }

    console.log("params: ", params);
    this.http.get<Ebook[]>(this.apiUrl, { params }).subscribe((ebooks) => {
      this.ebooks = ebooks;
      console.log(this.ebooks);
    });
  }

  onSearch(): void {
    this.fetchEbooks();
  }


  editEBook(ebook: Ebook) {
    console.log(ebook);
    this.route.navigate(['/edit/'+ebook.id], {state: {data: ebook}});
  }

  changeStatusEBook(ebook: Ebook){
    this.http.put(this.apiUrl + ebook.id + "/change-availability",{},this.options).subscribe(
      () => {
        console.log("Book status changed");
        window.location.reload()
      },
      error => {
        console.error("Error changing book status", error);
      }
    );
  }

  addStockEBook(id: number){
    console.log(id);
  }

  deleteEBook(id: number){
    console.log(id);
    this.http.delete(this.apiUrl + id, this.options).subscribe(
      () => {
        console.log("EBook eliminado");
        window.location.reload();
      },
      error => {
        console.error("Error al eliminar EBook", error);
      }
    );
  }

}
