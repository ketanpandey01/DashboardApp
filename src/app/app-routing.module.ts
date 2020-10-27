import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { PersonalproComponent } from './details/personalpro/personalpro.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthResolverService } from './services/auth-resolver.service';


const routes: Routes = [
  {path: '', redirectTo: 'details/personal', pathMatch: 'full'},
  {
    path:'details', 
    component: DetailsComponent, 
    resolve: { authResolver : AuthResolverService},
    children: [
      {path:'personal', component: PersonalproComponent},
      {path:'professional', component: PersonalproComponent}
    ]
  },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  { path: '**', redirectTo: 'details' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthResolverService]
})
export class AppRoutingModule { }
