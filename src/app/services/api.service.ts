import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  createData() {

  }

  readData() {
    return this.http.get(`${this.api}posts/1`);
  }

  updateData() {

   }

  deleteData() {

  }
}
