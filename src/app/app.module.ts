import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MobileComponent } from './layouts/mobile/mobile.component';
import { LoginComponent } from './pages/login/login.component';
import { DarshboardComponent } from './pages/darshboard/darshboard.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { DetenteurComponent } from './pages/detenteur/detenteur.component';
import { EquipementDetenteurComponent } from './pages/equipement-detenteur/equipement-detenteur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AddEquipementComponent } from './pages/add-equipement/add-equipement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PdfViewerModule} from 'ng2-pdf-viewer'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderConfig, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { ManageUniteComponent } from './pages/manage-unite/manage-unite.component';
import { UniteComponent } from './dialog/unite/unite.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ManageBataillonComponent } from './pages/manage-bataillon/manage-bataillon.component';
import { BataillonComponent } from './dialog/bataillon/bataillon.component';
import { ManageCategorieComponent } from './pages/manage-categorie/manage-categorie.component';
import { ManageTypeComponent } from './pages/manage-type/manage-type.component';
import { CategorieComponent } from './dialog/categorie/categorie.component';
import { TypeComponent } from './dialog/type/type.component';
import { TagComponent } from './dialog/tag/tag.component';
import { ManageTagComponent } from './pages/manage-tag/manage-tag.component';
import { ManageGradeComponent } from './pages/manage-grade/manage-grade.component';
import { GradeComponent } from './dialog/grade/grade.component';
import { ProvinceComponent } from './dialog/province/province.component';
import { ManageProvinceComponent } from './pages/manage-province/manage-province.component';
import { ManageEquipementComponent } from './pages/manage-equipement/manage-equipement.component';
import { EquipementsComponent } from './dialog/equipements/equipements.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text:"Loading...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor:"#596643",
  bgsColor:"#596643",
  fgsColor:"#596643",
  fgsType:SPINNER.ballSpinClockwiseFadeRotating,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MobileComponent,
    LoginComponent,
    DarshboardComponent,
    MenuComponent,
    DetenteurComponent,
    EquipementDetenteurComponent,
    AddEquipementComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    UtilisateurComponent,
    SignupComponent,
    ManageUniteComponent,
    UniteComponent,
    ManageBataillonComponent,
    BataillonComponent,
    ManageCategorieComponent,
    ManageTypeComponent,
    CategorieComponent,
    TypeComponent,
    TagComponent,
    ManageTagComponent,
    ManageGradeComponent,
    GradeComponent,
    ProvinceComponent,
    ManageProvinceComponent,
    ManageEquipementComponent,
    EquipementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule,
    ReactiveFormsModule,
    PdfViewerModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
