import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UniteComponent } from './dialog/unite/unite.component';
import { AddEquipementComponent } from './pages/add-equipement/add-equipement.component';
import { DarshboardComponent } from './pages/darshboard/darshboard.component';
import { DetenteurComponent } from './pages/detenteur/detenteur.component';
import { EquipementDetenteurComponent } from './pages/equipement-detenteur/equipement-detenteur.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageBataillonComponent } from './pages/manage-bataillon/manage-bataillon.component';
import { ManageCategorieComponent } from './pages/manage-categorie/manage-categorie.component';
import { ManageEquipementComponent } from './pages/manage-equipement/manage-equipement.component';
import { ManageEquipementagsComponent } from './pages/manage-equipementags/manage-equipementags.component';
import { ManageGradeComponent } from './pages/manage-grade/manage-grade.component';
import { ManageProvinceComponent } from './pages/manage-province/manage-province.component';
import { ManageTagComponent } from './pages/manage-tag/manage-tag.component';
import { ManageTypeComponent } from './pages/manage-type/manage-type.component';
import { ManageUniteComponent } from './pages/manage-unite/manage-unite.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { 
    path: 'darshboard', component:DarshboardComponent
  },
  { 
  path: 'equipement', 
  component:ManageEquipementComponent, 
 // canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }

  },
  { 
    path: 'grades', 
    component:ManageGradeComponent, 
   // canActivate:[RouteGuardService],
    // data:{
    //   //expectedRole:['admin']
    // }
  
    },
    { 
      path: 'provinces', 
      component:ManageProvinceComponent, 
     // canActivate:[RouteGuardService],
      // data:{
      //   //expectedRole:['admin']
      // }
    
      },
  {
  path: 'unites', 
  component:ManageUniteComponent, 
 // canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }

  },
  {
  path: 'bataillons', 
  component:ManageBataillonComponent, 
 // canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }

  },
  {
    path: 'equipementags', 
    component:ManageEquipementagsComponent, 
   // canActivate:[RouteGuardService],
    // data:{
    //   //expectedRole:['admin']
    // }
  
    },
  {
  path: 'tags', 
  component:ManageTagComponent, 
 // canActivate:[RouteGuardService],
  // data:{
  //   //expectedRole:['admin']
  // }

  },
  {
    path: 'categories', 
    component:ManageCategorieComponent, 
   // canActivate:[RouteGuardService],
    // data:{
    //   //expectedRole:['admin']
    // }
  
    },
    {
      path: 'types', 
      component:ManageTypeComponent, 
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
