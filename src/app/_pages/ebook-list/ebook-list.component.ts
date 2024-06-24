import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';


interface Ebook {
  title: string;
  author: string;
  genre: string;
  format: string;
  price: number;
}

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styles: [
  ],

})
export class EbookListComponent implements OnInit {
  apiUrl: string = 'http://localhost:5000/api/ebook';
  ebooks: Ebook[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Ebook[]>(this.apiUrl).subscribe((ebooks) => {
      this.ebooks = ebooks;
    });
  }

}
