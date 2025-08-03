import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-account-detail',
    imports: [CommonModule, RouterModule], // <--- Aquí el cambio
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  userId: string | null = null;
  user: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user = this.authService.getUserDetail();
  }
}
