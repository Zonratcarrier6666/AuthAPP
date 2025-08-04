import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl + 'roles';

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRole(roleName: string) {
    return this.http.post(this.apiUrl, { roleName });
  }

  deleteRole(roleId: string) {
    return this.http.delete(`${this.apiUrl}/${roleId}`);
  }

  assignRole(userId: string, roleId: string) {
    return this.http.post(`${this.apiUrl}/assign`, { userId, roleId });
  }
}
