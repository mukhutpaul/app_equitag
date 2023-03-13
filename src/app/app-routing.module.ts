import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEquipementComponent } from './pages/add-equipement/add-equipement.component';
import { DarshboardComponent } from './pages/darshboard/darshboard.component';
import { DetenteurComponent } from './pages/detenteur/detenteur.component';
import { EquipementDetenteurComponent } from './pages/equipement-detenteur/equipement-detenteur.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { LoginComponent } from './pages/login/login.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { 
    path: 'darshboard', component:DarshboardComponent
  },
  { 
  path: 'equipement', 
  component:EquipementComponent, 
 // canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }

  },
  { path: 'detenteur', component:DetenteurComponent },
  { path: 'detenteur_equipement', component:EquipementDetenteurComponent },
  { path: 'ajout_equipement', component:AddEquipementComponent },
  { path: 'utilisateur', component:UtilisateurComponent,
  //canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }


  },

  // { path: '', component: LoginComponent },
  // {
  //   path: 'cafe',
  //   component: LoginComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'darshboard',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: '',
  //       loadChildren:
  //         () => import('./shared/material-module').then(m => m.MaterialModule),
  //         canActivate:[RouteGuardService],
  //         data:{
  //           expectedRole:['admin','user']
          
  //         }
  //     },
  //     {
  //       path: 'darshboard',
  //       loadChildren: () => import('./pages/darshboard/darshboard.component').then(m => m.DarshboardComponent),
  //       canActivate:[RouteGuardService],
  //       data:{
  //         expectedRole:['admin','user']
  //       }
  //     }
  //   ]
  // },
  // { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
