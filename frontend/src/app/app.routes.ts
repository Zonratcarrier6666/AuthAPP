import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';
import { Register} from './pages/register/register';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'account/:id', component: AccountDetailComponent },
  {path: 'register',component: Register}

];
