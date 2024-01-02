import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HomeService } from 'src/app/services/home.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-darshboard',
  templateUrl: './darshboard.component.html',
  styleUrls: ['./darshboard.component.scss']
})
export class DarshboardComponent {
  responseMessage:any;
	data:any;
  eq:any;

  constructor(
		private ngxservice:NgxUiLoaderService,
		private snackbarservice:SnackbarService,
    private dashboardService:HomeService
		) {
		
		this.ngxservice.start();
    this.dashboardData();

    // const token = localStorage.getItem('token')
    // console.log()
      
    //  console.log(jwtDecode('3b0ae8df4f179ffec079cb677e39681ca619877e3a2247408ed6ad6767b3aadf'))
    
	
	}

dashboardData(){
  this.dashboardService.gethome().subscribe((response:any)=>{
  this.ngxservice.stop();
  this.data=response?.detail;
  this.eq="active"

},(error:any)=>{
  this.ngxservice.stop();
  console.log(error);
  if(error.error?.message){
    this.responseMessage = error.error?.message;
  }else{
    this.responseMessage = GlobalConstants.genericError;
  }
     this.snackbarservice.openSnackBar(this.responseMessage,GlobalConstants.error);
})
}
}


