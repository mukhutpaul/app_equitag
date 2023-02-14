import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MobileComponent } from './layouts/mobile/mobile.component';
import { LoginComponent } from './pages/login/login.component';
import { DarshboardComponent } from './pages/darshboard/darshboard.component';
import { EquipementComponent } from './pages/equipement/equipement.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { DetenteurComponent } from './pages/detenteur/detenteur.component';
import { EquipementDetenteurComponent } from './pages/equipement-detenteur/equipement-detenteur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MobileComponent,
    LoginComponent,
    DarshboardComponent,
    EquipementComponent,
    MenuComponent,
    DetenteurComponent,
    EquipementDetenteurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
