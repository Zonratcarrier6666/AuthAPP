import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';
import { Register} from './pages/register/register';
import { Admin } from './pages/admin/admin';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'account/:id', component: AccountDetailComponent },
  {path: 'register',component: Register}

];
