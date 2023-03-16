import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-darshboard',
  templateUrl: './darshboard.component.html',
  styleUrls: ['./darshboard.component.scss']
})
export class DarshboardComponent {

  constructor(
		private ngxservice:NgxUiLoaderService,
		private snackbarservice:SnackbarService
		) {
		
		this.ngxservice.start();
    this.dashboardData();
	
	}

  dashboardData(){
  
  this.ngxservice.stop();
 
}
}


