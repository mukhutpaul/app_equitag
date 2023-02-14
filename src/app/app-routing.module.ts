import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DarshboardComponent } from './pages/darshboard/darshboard.component';
import { DetenteurComponent } from './pages/detenteur/detenteur.component';
import { EquipementDetenteurComponent } from './pages/equipement-detenteur/equipement-detenteur.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'darshboard', component:DarshboardComponent },
  { path: 'equipement', component:EquipementComponent },
  { path: 'detenteur', component:DetenteurComponent },
  { path: 'detenteur_equipement', component:EquipementDetenteurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
