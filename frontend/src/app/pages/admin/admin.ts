import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms'; // <-- importa esto
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  selectedUserId: string = '';
  selectedRoleId: string = '';
  newRoleName: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  createRole() {
    if (!this.newRoleName.trim()) return;
    this.roleService.createRole(this.newRoleName).subscribe(() => {
      this.newRoleName = '';
      this.loadRoles();
    });
  }

  assignRole() {
    if (this.selectedUserId && this.selectedRoleId) {
      this.roleService.assignRole(this.selectedUserId, this.selectedRoleId).subscribe(() => {
        alert('Rol asignado correctamente');
        this.loadUsers();
      });
    }
  }

  deleteRole(roleId: string) {
    this.roleService.deleteRole(roleId).subscribe(() => {
      this.loadRoles();
    });
  }
}
