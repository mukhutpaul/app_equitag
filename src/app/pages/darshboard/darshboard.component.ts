import { Component } from '@angular/core';
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

  constructor(
		private ngxservice:NgxUiLoaderService,
		private snackbarservice:SnackbarService,
    private dashboardService:HomeService
		) {
		
		this.ngxservice.start();
    this.dashboardData();
    
	
	}

  dashboardData(){
  this.dashboardService.gethome().subscribe((response:any)=>{
  this.ngxservice.stop();
  this.data=response?.detail;
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


