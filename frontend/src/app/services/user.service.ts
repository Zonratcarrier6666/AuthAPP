import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + 'account';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUserDetail() {
    return this.http.get<any>(`${this.apiUrl}/detail`);
  }
}
